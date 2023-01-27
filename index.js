class ProductManager {
	
	//Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

    constructor(){
        this.products = [];
    };

	//Cada producto que gestione debe contar con las propiedades: title, description, price, thumbnail, code, stock

    addProduct = ({ title, description, price, thumbnail, code, stock }) => {
		if (!title || !description || !price || !thumbnail || !code || !stock)
			return 'Todos los campos son requeridos';
		if (
			title == ' ' ||
			description == ' ' ||
			price == ' ' ||
			thumbnail == ' ' ||
			code == ' ' ||
			stock == ' '
		)
			return 'Todos los campos son requeridos';
		const codeExists = this.products.some(product => product.code === code);
		if (codeExists) return 'El codigo ya existe';
		const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
		this.products.push({ id, title, description, price, thumbnail, code, stock });
	};
	getProducts = () => this.products;
	getProductById = id => this.products.find(product => product.id === id) || 'Not found';
}

// Se creará una instancia de la clase ProductManager

const product1 = new ProductManager();

// Se llamará “getProducts” debe devolver un array vacío []

console.log(product1.getProducts());

// Se llamará al método “addProduct”

product1.addProduct({
	title: 'producto 1',
	description: 'Este es un producto de prueba',
	price: 999,
	thumbnail: '...',
	code: '01',
	stock: 20
});

// Se llamará el método “getProducts” nuevamente, debe aparecer el producto recién agregado

console.error(product1.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

product1.addProduct({
	title: 'producto 1',
	description: 'Este es un producto de prueba',
	price: 999,
	thumbnail: '...',
	code: '01',
	stock: 20
});

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

console.log(product1.getProductById(1));
console.error(product1.getProductById(3));

product1.addProduct({
	title: 'producto 1',
	description: 'Este es un producto de prueba',
	price: 999,
	thumbnail: '...',
	code: '01',
	stock: ''
});

