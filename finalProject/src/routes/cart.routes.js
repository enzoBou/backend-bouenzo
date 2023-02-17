const { Router } = require("express");
const CartManager = require('../cartManager');

const router = Router();

const cartManager = new CartManager('../db/products.json');

router.post('/', async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ message: 'Cart added successfully' });
});

router.get('/:cid', async (req, res) => {
	const products = await cartManager.getProdsByCartId(Number(req.params.cid));
	if (!products) return res.status(404).json({ message: '[!] Cart not found' });
	res.status(200).json({ products });
});

router.post('/:cid/product/:pid', async (req, res) => {
	await cartManager.addProdToCart(Number(req.params.cid), Number(req.params.pid));
	res.status(200).json({ message: 'Product added successfully' });
});

module.exports = router;