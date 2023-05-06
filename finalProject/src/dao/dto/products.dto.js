export class CartDTO {
    constructor(cart) {
        this.id = cart._id.toString();
        this.products = 
            cart.products.map((product) => ({
            id: product.product._id.toString(),
            name: product.product.name,
            description: product.product.description,
            price: product.product.price,
            quantity: product.quantity,
        }))
    }
};