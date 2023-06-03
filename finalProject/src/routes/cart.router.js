import { Router } from 'express';
import CartServiceDao from '../repository/index.js'
import CartController from '../controller/cart.controller.js'

const router = Router();

const cartManager = new CartServiceDao();

router.post("/", CartController.addCart);
router.get("/:cid", CartController.getProductsByCartId);
router.post("/:cid/products/:pid", CartController.addProductToCart);
router.delete("/:cid/products/:pid", CartController.delProductFromCart);
router.put("/:cid/products/:pid", CartController.updateQuantity);
router.delete("/:cid/products", CartController.delProducts);
router.post('/:cid/purchase',CartController.purchaseCart);

export default router;