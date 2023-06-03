import { Products } from "../dao/factory.js";
import MessageServiceDao from "./chat.repository.js";
import ProductServiceDao from "./product.repository.js";
import CartServiceDao from "./cart.repository.js";

export const ProductService = new ProductServiceDao(new Products());

export default {
    MessageServiceDao,
    ProductServiceDao,
    CartServiceDao
};