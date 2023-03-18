const { Router } = require("express");
const CartManager = require('../dao/cartManager.mongo');

const router = Router();

const cartManager = new CartManager();

router.post('/', async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ message: 'Añadido al carrito' });
});

router.get('/:cid', async (req, res) => {
	const cart = await cartManager.getProductsByCartId(req.params.cid);
	res.status(200).render('cart', { cart: cart });
});

router.post('/:cid/product/:pid', async (req, res) => {
	await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
	res.status(200).json({ message: 'Producto agregado' });
});

router.delete('/:cid/products/:pid', async (req, res) => {
	await cartManager.delProductFromCart(req.params.cid, req.params.pid);
	res.status(200).json({ message: 'Producto eliminado' });
});

router.put('/:cid', async (req, res) => {
	
});

router.put('/:cid/products/:pid', async (req, res) => {
	await cartManager.updateQuantity(req.params.cid, req.params.pid, req.body.quantity);
	res.status(200).json({ message: 'Cantidad actualizada' });
});

router.delete('/:cid', async (req, res) => {
	await cartManager.delProducts(req.params.cid);
	res.status(200).json({ message: 'Carrito vacio' });
});

module.exports = router;