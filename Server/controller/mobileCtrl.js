const Mobile = require('../models/mobileModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 15;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const mobileCtrl = {
    getMobileById: async (req, res) => {
        try {
            const item = await Mobile.findById(req.params.id); // _id based
            if (!item) return res.status(404).json({ msg: 'Mobile not found' });
            res.json(item);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getMobiles: async (req, res) => {
        try {
            const features = new APIfeatures(Mobile.find(), req.query)
                .filtering()
                .sorting()
                .pagination();
            const mobiles = await features.query;
            res.json({ result: mobiles.length, mobiles });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createMobile: async (req, res) => {
        try {
            const { mobile_id, title, price, description, image, brand, category, specs } = req.body;

            const mobile = await Mobile.findOne({ mobile_id });
            if (mobile) return res.status(403).json({ msg: "Mobile already exists" });

            const newMobile = new Mobile({
                mobile_id,
                title,
                price,
                description,
                image,
                brand,
                category,
                specs
            });

            await newMobile.save();
            res.json({ msg: "Mobile Created" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteMobile: async (req, res) => {
        try {
            await Mobile.findByIdAndDelete(req.params.id);
            res.json({ msg: "Mobile Deleted" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateMobile: async (req, res) => {
        try {
            const { mobile_id, title, price, description, image, brand, category, specs } = req.body;

            await Mobile.findByIdAndUpdate(req.params.id, {
                mobile_id,
                title,
                price,
                description,
                image,
                brand,
                category,
                specs
            });

            res.json({ msg: "Mobile Updated" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = mobileCtrl;
