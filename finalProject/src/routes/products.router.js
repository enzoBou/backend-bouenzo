const router = require('express').Router();
const productModel = require('../dao/models/product.model');
const ProductManager = require('../dao/productManager.mongo');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
	const { limit = 4, page = 1, query = null, sort = 1 } = req.query;
	const products = await productModel.paginate({}, { lean: true, limit, page });
	res.status(200).render('products', {
		status: 'success',
		payload: products.docs,
		totalPages: products.totalDocs,
		prevPage: products.prevPage,
		nextPage: products.nextPage,
		page: products.page,
		hasPrevPage: products.hasPrevPage,
		hasNextPage: products.hasNextPage,
		prevLink: products.hasPrevPage ? '' : null,
		nextLink: products.hasNextPage ? '' : null
	});
});

router.get('/filter', async (req, res) => {
	const { limit = 3, sort = 1 } = req.query;
	const products = await productModel.aggregate([{ $sort: { price: sort } }, { $limit: limit }]);
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
