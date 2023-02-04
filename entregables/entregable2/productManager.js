const fs = require("fs/promises")

class ProductManager {
    constructor(ruta){
        this.path = ruta;
        this.products = [];
    };
    async addProduct(product){
        try {
            const { title, description, price, thumbnail,code, stock} = product;
            
            const listProducts = await this.getProducts();
            const lastId = listProducts.products[listProducts.products.length - 1].id + 1;
            const insertProduct = {
                title: "pantalon",
                description: "pantalon corto",
                price: 2500,
                thumbnail: "./",
                code: 4,
                stock: 20
                };
            listProducts.products.push({ id: lastId, ...insertProduct });
            return await fs.appendFile(this.path, JSON.stringify(listProducts));
            } catch (error) {
                console.log('error addProduct');
            }
        };

	async getProducts() {
        try {
            const info = await fs.readFile(this.path)
            return JSON.parse(info)
        } catch (error) {
            console.log('error');
        }
    }
	async getProductById(){
        id => this.products.find(product => product.id === id) || 'Not found';
    }
    async deleteProductById(id) {
        try{
          if(!id){
            throw new Error('Missing id')
          }
          const products = await this.getProducts(); 
          const filteredProducts = products.filter(product => product.id !== id);
          fs.writeFile(this.path, JSON.stringify(filteredProducts), 'utf-8');
          console.log('Product deleted');
        } catch(error){
          console.log('error');
        }
    }
}

module.exports = ProductManager;