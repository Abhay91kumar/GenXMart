const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    title: {
        type: String,
        trim: true,
        require: true
    },
    price: {
        type: Number,
        trim: true,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    contain: {
        type: String,
        require: true
    },
    image: {
        type: Object,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);