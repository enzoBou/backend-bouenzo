import { Router } from 'express';
import ProductCtrl from '../controller/products.controller.js';

const router = Router();

router.get('/', ProductCtrl.getProducts);
router.get('/filter', ProductCtrl.filterProducts);
router.get('/:pid', ProductCtrl.getProductById);
router.post('/', ProductCtrl.addProduct);
router.put('/:pid', ProductCtrl.updateProduct);
router.delete('/:pid', ProductCtrl.deleteProduct);

export default router;
