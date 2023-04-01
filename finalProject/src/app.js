const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");
const mongoStore = require ('connect-mongo')
const cookieParser = require ('cookie-parser');
const session = require ('express-session');
const displayRoutes = require("express-routemap");
const initializePassport = require("./config/passport.config")
const passport = require("passport")

const productsRouter = require ("./routes/products.router");
const cartRouter = require ("./routes/cart.router");
const chatRouter = require("./routes/chat.router");
const loginRouter = require ('./routes/login.router');
const viewsRoutes = require ('./utils/views.routes')

const productModel = require('./dao/models/product.model');
const ProductManager = require("./dao/productManager.mongo");

const productManager = new ProductManager;
const app = express();
const PORT = 8080;
const BASE_PREFIX = "api";
const httpServer = app.listen(PORT, () => {displayRoutes(app);console.log(`Listening on ${PORT}`);});
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(session({
	store: mongoStore.create({
		mongoUrl: 'mongodb+srv://enzobou:1535243517enzo@clusterenzo.4qppgwb.mongodb.net/?retryWrites=true&w=majority',
		mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
		ttl: 60 * 3600,
	}),
	secret:'secretSession',
	resave: false,
	saveUnitialized:true,
}));
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(`${__dirname}/views`));
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(`/${BASE_PREFIX}/products`, productsRouter);
app.use(`/${BASE_PREFIX}/cart`, cartRouter);
app.use(`/${BASE_PREFIX}/chat`, chatRouter);
app.use(`/`, loginRouter);
app.use(`/${BASE_PREFIX}`, viewsRoutes);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

socketServer.on("connection", async socket => {
	console.log('Nuevo cliente conectado');

	const products = await productModel.find({});
	socket.emit('products', products);

	socket.on('addProd', async products => await productManager.addProduct(products));

	socket.on('delProd', async id => await productManager.deleteProductById(id));
});

mongoose.connect('mongodb+srv://enzobou:1535243517enzo@clusterenzo.4qppgwb.mongodb.net/?retryWrites=true&w=majority');
