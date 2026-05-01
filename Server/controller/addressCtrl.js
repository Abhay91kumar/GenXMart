const Address = require('../models/addressModel');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const addressCtrl = {
    getAddress: async (req, res) => {
        try {
            const features = new APIfeatures(
                Address.find({ user_id: req.user.id }),
                req.query
            ).pagination();

            const addresses = await features.query;

            res.json({
                result: addresses.length,
                addresses
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getAddressById: async (req, res) => {
        try {
            const address = await Address.findOne({
                _id: req.params.id,
                user_id: req.user.id
            });

            if (!address)
                return res.status(404).json({ msg: "Address not found" });

            res.json(address);

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createAddress: async (req, res) => {
        try {
            const {
                fullName,mobile, pincode,
                house, area, landmark, city,
                state,addressType} = req.body;

            const newAddress = new Address({
                user_id: req.user.id,
                fullName, mobile, pincode, house,
                area, landmark, city, state,addressType
            });

            await newAddress.save();

            res.json({ msg: "Address Added" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateAddress: async (req, res) => {
        try {
            const address = await Address.findOneAndUpdate(
                { _id: req.params.id, user_id: req.user.id },
                req.body,
                { new: true }
            );

            if (!address)
                return res.status(404).json({ msg: "Address not found" });

            res.json({ msg: "Address Updated" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteAddress: async (req, res) => {
        try {
            const address = await Address.findOneAndDelete({
                _id: req.params.id,
                user_id: req.user.id
            });

            if (!address)
                return res.status(404).json({ msg: "Address not found" });

            res.json({ msg: "Address Deleted" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = addressCtrl;