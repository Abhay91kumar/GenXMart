const { json } = require('express');
const Product = require('../models/productModel');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        // console.log("Query before filtering:", queryObj);

        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => `$${match}`);

        // console.log("Parsed query:", JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 27;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productCtrl = {
    getProduct: async (req, res) => {
        try {

            const features = new APIfeatures(Product.find(), req.query)
                .filtering()
                .sorting()
                .pagination();
            // console.log(req.query)
            const products = await features.query
            res.json({ result: products.length, products })
        } catch (err) { return res.status(500).json({ msg: err.message }) }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, contain, image, category } = req.body;

            const product = await Product.findOne({ product_id })
            if (product) { return res.status(403).json({ msg: "Product Already Exist" }) }

            const newProduct = new Product({
                product_id, title: title, price, description, contain, image, category

            })
            await newProduct.save()
            res.json({ msg: "Product Created" })
        } catch (err) { return res.status(500).json({ msg: err.message }) }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({ msg: "Product Deleted" })
        } catch (err) { return res.status(500).json({ msg: err.message }) }
    },
    updateProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, contain, image, category } = req.body
            await Product.findByIdAndUpdate({ _id: req.params.id }, {
                product_id, title: title, price, description, contain, image, category
            })


            res.json({ msg: "Product Updated" })
        } catch (er) { return res.status(500).json({ msg: er.message }) }
    },
    getSingleProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });

            res.json(product);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

}
module.exports = productCtrl;