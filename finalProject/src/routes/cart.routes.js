const { Router } = require("express");
const CartManager = require('../cartManager');

const router = Router();

const cartManager = new CartManager('../db/products.json');

router.post('/', async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ message: 'Añadido al carrito' });
});

router.get('/:cid', async (req, res) => {
	const products = await cartManager.getProductsByCartId(Number(req.params.cid));
	if (!products) return res.status(404).json({ message: 'Not found' });
	res.status(200).json({ products });
});

router.post('/:cid/product/:pid', async (req, res) => {
	await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
	res.status(200).json({ message: 'Producto agregado' });
});

module.exports = router;