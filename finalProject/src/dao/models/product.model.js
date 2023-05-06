import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	category: { type: String },
	price: { type: Number },
	code: { type: Number },
	stock: { type: Number },
	thumbnails: []
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model('Products', productSchema);

export default {productModel}
    
