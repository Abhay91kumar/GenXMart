const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
    mobile_id: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    specs: {
        type: Object,
        required: true
        /*
        Example:
        {
            ram: "8GB",
            storage: "128GB",
            battery: "5000mAh",
            camera: "64MP + 12MP",
            processor: "Snapdragon 888"
        }
        */
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
});

module.exports = mongoose.model('Mobile', mobileSchema);
