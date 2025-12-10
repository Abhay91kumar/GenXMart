const { json } = require('express');
const Fashion = require('../models/fashionModel')

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
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const fashionCtrl = {
    getFashionById: async (req, res) => {
        try {
            const item = await Fashion.findById(req.params.id);
            if (!item) return res.status(404).json({ msg: 'Fashion item not found' });
            res.json(item);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFashion: async (req, res) => {
        try {
            const features = new APIfeatures(Fashion.find(), req.query)
                .filtering()
                .sorting()
                .pagination();
            // console.log(req.query)
            const fashions = await features.query
            res.json({ result: fashions.length, fashions })
        } catch (err) { return res.status(500).json({ msg: err.message }) }
    },
    createFashion: async (req, res) => {
        try {
            const { fashion_id, title, price, description, image, category } = req.body;

            const fashion = await Fashion.findOne({ fashion_id })
            if (fashion) { return res.status(403).json({ msg: "Fashion Already Exist" }) }

            const newFashion = new Fashion({
                fashion_id, title: title, price, description, image, category

            })
            await newFashion.save()
            res.json({ msg: "Fashion Created" })
        } catch (err) { return res.status(500).json({ msg: err.message }) }
    },
    deleteFashion: async (req, res) => {
        try {
            await Fashion.findByIdAndDelete(req.params.id);
            res.json({ msg: "Fashion Deleted" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateFashion: async (req, res) => {
        try {
            const { fashion_id, title, price, description, image, category } = req.body;

            await Fashion.findByIdAndUpdate(req.params.id, {
                fashion_id,
                title: title,
                price,
                description,
                image,
                category
            });

            res.json({ msg: "Fashion Updated" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = fashionCtrl;