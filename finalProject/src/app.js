const express = require("express");
const productsRoutes = require ("./routes/products.routes")
const cartRoutes = require ("./routes/cart.routes")

const PORT = 8080;
const app = express();
const BASE_PREFIX = "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(`${__dirname}/public`));

app.use(`/${BASE_PREFIX}/products`, productsRoutes);
app.use(`/${BASE_PREFIX}/carts`, cartRoutes);

app.listen(PORT, () => {
    console.log(`API RUNNING ON PORT ${PORT}`);
});

