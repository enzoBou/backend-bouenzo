const router = require('express').Router();
const ProductManager = require('../dao/productManager.mongo');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
	const limit = Number(req.query.limit);
	const products = await productManager.getProducts();
	if (limit) return res.status(200).json(products.slice(0, limit));
	res.status(200).render('products', { products });
});

router.get('/:pid', async (req, res) => {
	const product = await productManager.getProduct(req.params.pid);
	if (!product) return res.status(404).render('home', { message: 'Producto no encontrado' });
	res.status(200).render('product', { product });
});

router.post('/', async (req, res) => {
	const { title, description, code, price, stock, category } = req.body;
	if (!title || !description || !code || !price || !stock || !category)
		return res.status(400).json({ message: 'Todos los campos son requeridos' });
	await productManager.addProduct(req.body);
	res.status(200).json({ message: 'Producto agregado satisfactoriamente' });
});

router.put('/:pid', async (req, res) => {
	await productManager.updateProduct(req.params.pid, req.body);
	res.status(200).json({ message: 'Producto actualizado satisfactoriamente' });
});

router.delete('/:pid', async (req, res) => {
	await productManager.deleteProduct(req.params.pid);
	res.status(200).json({ message: 'Producto eliminado satisfactoriamente' });
});

module.exports = router;
