const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const productsRoutes = require ("./routes/products.routes");
const cartRoutes = require ("./routes/cart.routes");
const { Server } = require("socket.io");
const viewsRoutes = require("./routes/views.routes");
const ProductManager = require('./productManager');

const PORT = 8080;
const app = express();
const BASE_PREFIX = "api";
const productManager = new ProductManager('src/db/products.json');
const server = app.listen(PORT, () => {
    console.log(`API RUNNING ON PORT ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(`${__dirname}/views`));
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));

app.use("/", viewsRoutes);
app.use(`/${BASE_PREFIX}/products`, productsRoutes);
app.use(`/${BASE_PREFIX}/carts`, cartRoutes);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

const io = new Server(server);

io.on("connection", async socket => {
	console.log('Nuevo cliente conectado');

	const products = await productManager.getProducts();
	
	socket.emit('products', products);

	socket.on('addProd', async prod => await productManager.addProduct(prod));
	socket.on('delProd', async id => await productManager.deleteProductById(id));
});