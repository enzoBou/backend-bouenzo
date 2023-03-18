const cartModel = require('./models/cart.model');
const producModel = require('./models/product.model');

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
			const cart = await cartModel.findById(id).populate('products.product').lean();
			return cart;
		} catch (error) {
			console.log(error);
		}
	};
	addProductToCart = async (cid, pid) => {
		try {
			const cart = await cartModel.findById(cid);
			cart.products.push({ product: pid });
			cart.save();
		} catch (error) {
			console.log(error);
		}
	};
	delProductFromCart = async (cid, pid) => {
		try {
			await cartModel.findByIdAndUpdate(cid, {
				$pull: { products: { _id: pid } }
			});
		} catch (error) {
			console.log(error);
		}
	};
	delProducts = async cid => {
		try {
			await cartModel.findByIdAndUpdate(cid, {
				$pull: { products: {} }
			});
		} catch (error) {
			console.log(error);
		}
	};
	updateQuantity = async (cid, pid, quantity) => {
		const cart = await cartModel.findById(cid);
		const product = cart.products.find(p => p._id.toString() === pid);
		product.quantity += quantity;
		cart.save();
	};
}

module.exports = CartManager;