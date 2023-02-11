const express = require("express");
const ProductManager = require("./productManager")

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./db.json');

app.get("/", (req , res) => {
    res.send(`API ALIVE ${PORT}!!!`)
});

app.get(`/products`, async (req, res) => {
  	const limit = Number(req.query.limit);
	const products = await productManager.getProducts();
	if (limit) return res.status(200).json(products.slice(0, limit));
	res.status(200).json(products);
});

app.get(`/products/:pid`, async (req, res) => {
	const id = Number(req.params.pid);
	const product = await productManager.getProductById(id);
	if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
	res.status(200).json(product);
});

app.listen(PORT, () => {
    console.log(`API RUNNING ON PORT ${PORT}`);
});