const { Router } = require("express");
const router = Router();
const products = require('../db/products.json')

router.get("/", (req, res) => {
  res.render("index", {
    products: products
  });
});

router.get("/realtimeproducts", (req,res) => {
  res.render("realTimeProducts", {
    style: 'realtimeproducts.css'
  })
})

module.exports = router;