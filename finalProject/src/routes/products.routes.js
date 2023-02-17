const { Router } = require("express");
const productsList = require("../db/products.json")
const ProductManager = require("../productManager")

const router = Router();
const productManager = new ProductManager('../db/products.json');

router.get(`/`, (req, res) => {
    return res.json({
      ok: true,
      message: `lista de productos`,
      products: productsList,
    });
  });

router.get(`/`, async (req, res) => {
    const limit = Number(req.query.limit);
  const products = await productManager.getProducts();
  if (limit) return res.status(200).json(products.slice(0, limit));
  res.status(200).json(products);
});

router.get(`/:pid`, async (req, res) => {
	const id = Number(req.params.pid);
	const product = await productManager.getProductById(id);
	if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
	res.status(200).json(product);
});

router.post(`/`, async (req, res) => {
	const { title, description, code, price, stock, category } = req.body;
	if (!title || !description || !code || !price || !stock || !category)
		return res.status(400).json({ message: 'Todos los campos son obligatorios' });
	await productManager.addProduct(req.body);
	res.status(200).json({ message: 'Producto agregado correctamente' });
});

router.put(`/:pid`, async (req,res) => {
  await productManager.updateProduct(Number(req.params.pid), req.body);
  res.status(200).json({ message: 'Producto actualizado'})
});

router.delete(`/:pid`, async (req,res) => {
  await productManager.deleteProductById(Number(req.params.pid));
  res.status(200).json({ message: 'Producto eliminado exitosamente'})
})

module.exports = router;