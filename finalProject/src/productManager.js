const fs = require("fs/promises")

class ProductManager {

    constructor(ruta){
        this.path = ruta;
        this.products = [];
    };

    async addProduct(product) {
		try {
			this.products = await this.getProducts();
			const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
			this.products.push({ id, ...product });
			return await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		} catch (error) {
			fs.writeFileSync(this.path, JSON.stringify(this.products));
			return error;
		}
	};

	async getProducts() {
        try {
            const info = await fs.readFile(this.path)
            return JSON.parse(info)
        } catch (error) {
            console.log('error');
        }
    };

	async getProductById(id) {
		try {
			this.products = await this.getProducts();
			return this.products.find(product => product.id === Number(id));
		} catch (error) {
			return error;
		}
	};
    
    async updateProduct (id, data) {
		try {
			this.products = await this.getProducts();
			let productUpd = this.products.find(product => product.id === id);
			if (!productUpd) return 'Producto no encontrado';
			let productIndex = this.products.findIndex(product => product.id === id);
			this.products[productIndex] = { ...productUpd, ...data };
			await fs.promises.writeFile(this.path, JSON.stringify(this.products));
			return 'Producto agregado correctamente';
		} catch (error) {
			return error;
		}
	};

    async deleteProductById(id) {
        try {
			this.products = await this.getProducts();
			this.products = this.products.filter(product => product.id !== Number(id));
			await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		} catch (error) {
			return error;
		}
	};
};

module.exports = ProductManager;