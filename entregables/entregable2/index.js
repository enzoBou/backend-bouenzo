const path = require('path');
const ProductManager = require("./productManager")

const proyectoProducts = async () => {
	console.log('index proyectoProducts');

	try {
		const rutaBase = path.join(`${__dirname}/db.json`);
		const Product = new ProductManager(rutaBase);
		const listProducts = await Product.getProducts();
		console.log(listProducts);

		const productManager = {
			title: "Medias",
			description: "Par de medias blancas",
			price: 2000,
			thumbnail: './',
			code: 3,
			stock: 20 
		}
		const newProduct = await Product.addProduct(productManager);
		console.log(productManager);
	} 
	catch (error) {
		console.log('error');
	}
}

proyectoProducts();
