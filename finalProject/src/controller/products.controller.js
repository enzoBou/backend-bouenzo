import { ProductService } from "../repository/index.js";
import { paginateResults } from "../utils/paginate.js";
import { EnumErrors, ErrorsHTTP } from "../service/errors/error.handle.js";

const httpResp = new ErrorsHTTP();

export default class ProductCtrl {
  productService;

  constructor() {
    this.productService = ProductService;
  }

  getProducts = async (req, res) => {
    try {
      const { limit = 10, page = 1 } = req.query;
      const products = await this.productService.getProducts();
      const paginatedResults = paginateResults(products, parseInt(limit), parseInt(page));
      return res.json({
        message: 'getProducts',
        products: paginatedResults.results,
        totalPages: paginatedResults.totalPages,
        currentPage: paginatedResults.currentPage,
        hasNextPage: paginatedResults.hasNextPage,
        hasPrevPage: paginatedResults.hasPrevPage,
        nextPage: paginatedResults.nextPage,
        prevPage: paginatedResults.prevPage
      });
    } catch (error) {
      return httpResp.Error(res, 'Error al obtener los productos');
    }
  };

  filterProducts = async (req, res) => {
    try {
      const { limit = 3, sort = 1 } = req.query;
      const filteredProducts = await this.productService.filterProducts(limit, sort);
      return res.json({
        message: 'filterProducts',
        products: filteredProducts
      });
    } catch (error) {
      return httpResp.Error(res, 'Error al filtrar los productos');
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.productService.getProductById(pid);

      if (!product) {
        return httpResp.NotFound(res, 'Error 404 not found');
      }

      return res.json({
        message: 'getProductById',
        product: product
      });
    } catch (error) {
      return httpResp.Error(res, 'Error al filtrar los productos por ID');
    }
  };

  addProduct = async (req, res) => {
    try {
      const product = req.body;
      const newProduct = await this.productService.addProduct(product);
      return res.json({
        message: 'addProduct',
        product: newProduct
      });
    } catch (error) {
      return httpResp.Error(res, 'Error al agregar los productos');
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const productData = req.body;
  
      const updatedProduct = await this.productService.updateProduct(pid, productData);
  
      if (!updatedProduct) {
        return httpResp.NotFound(res, 'Error 404 not found');
      }
  
      return res.json({
        message: 'Product updated successfully',
        product: updatedProduct
      });
    } catch (error) {
      return httpResp.Error(res, 'Error al actualizar los productos');
    }
  };
};
