const cartModel = require('./models/cart.model');
const productModel = require('./models/product.model');

class CartManager {
	addCart = async () => {
		try {
			await cartModel.create({});
		} catch (error) {
			console.log(error);
		}
	};
	getProductsByCartId = async id => {
		try {
			const cart = await cartModel.findById(id);
			return cart.products;
		} catch (error) {
			console.log(error);
		}
	};
	addProductToCart = async (cid, pid) => {
		try {
			const prod = await productModel.findById(pid);
			const cart = await cartModel.findById(cid);
			cart.products.push(prod);
			cart.save();
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = CartManager;