import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0.0
    },
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: ['Parts', 'Accessories', 'Tools', 'Tyres', 'Oil & Fluids'],
            message: 'Please select correct category'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Using clean modern export syntax
export default mongoose.model('Product', productSchema);