import CartServiceDao from '../repository/cart.repository.js';
import ProductService from '../repository/product.repository.js';
import ticketModel from '../dao/models/ticket.model.js';
import ErrorsHTTP from '../service/errors/error.handle.js';

const cartServiceDao = new CartServiceDao();
const httpResp = new ErrorsHTTP();

export default class CartController {
  CartServiceDao;
  ProductService;
  constructor() {
    this.CartServiceDao = new CartServiceDao();
    this.ProductService = new ProductService();
  }

  async addCart(req, res) {
  try {
    await cartServiceDao.addCart();
    return httpResp.Created(res, 'Carrito creado con exito');
  } catch (error) {
    return httpResp.Error(res, 'Error al crear el carrito');
  }
  }

  async getProductsByCartId(req, res) {
  const cartId = req.params.cid;
  try {
    const cart = await cartServiceDao.getProductsByCartId(cartId);
    return httpResp.OK(res, { cart });
  } catch (error) {
    return httpResp.Error(res, 'Error al obtener el producto');
  }
  }

  async addProductToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    await cartServiceDao.addProductToCart(cartId, productId);
    return httpResp.OK(res, 'Producto agregado correctamente');
  } catch (error) {
    return httpResp.Error(res, 'Error al añadir el producto al carrito');
  }
  }

  async delProductFromCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    await cartServiceDao.delProductFromCart(cartId, productId);
    return httpResp.OK(res, 'Producto eliminado del carrito exitosamente');
  } catch (error) {
    return httpResp.Error(res, 'Error al eliminar el carrito');
  }
  }

  async delProducts(req, res) {
  const cartId = req.params.cid;
  try {
    await cartServiceDao.delProducts(cartId);
    return httpResp.OK(res, 'Productos eliminados del carrito exitosamente');
  } catch (error) {
    return httpResp.Error(res, 'Error al eliminar el carrito');
  }
  }

  async updateQuantity(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  try {
    await cartServiceDao.updateQuantity(cartId, productId, quantity);
    return httpResp.OK(res, 'Cantidad actualizada exitosamente');
  } catch (error) {
    return httpResp.Error(res, 'Error al actualizar el carrito');
  }
  }

  async purchaseCart(req, res) {
    const { cid } = req.params;

    try {
      const cart = await this.CartServiceDao.getProductsByCartId(cid);
      const productsToUpdate = [];
      const productsToRemove = [];

      for (const cartProduct of cart.products) {
        const product = await this.ProductService.getProductById(cartProduct.product);

        if (product.stock >= cartProduct.quantity) {
          product.stock -= cartProduct.quantity;
          productsToUpdate.push(product);
        } else {
          productsToRemove.push(cartProduct._id);
        }
      }

      const ticket = new ticketModel({
        code: generateTicketCode(),
        purchase_datetime: new Date(),
        amount: calculateTotalAmount(cart.products),
        purchaser: req.user.id,
      });

      await ticket.save();

      await this.CartServiceDao.removeProducts(cid, productsToRemove);
      await Promise.all(productsToUpdate.map(product => this.ProductService.updateProduct(product)));

      return httpResp.OK({
        res,
        message: 'Compra realizada con éxito',
        ticket,
        productsNotPurchased: productsToRemove,
      });
    } catch (error) {
      return httpResp.Error(res, 'Error al comprar el carrito');
    }
  }
}
