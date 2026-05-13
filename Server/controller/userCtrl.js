const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ msg: "Invalid email format." });
            }
            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "Email Already Registered" })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password Must be Greater than 5 charater" })


            const hpassword = await bcrypt.hash(password, 10);
            const newUser = new Users({
                name, email, password: hpassword
            })

            await newUser.save()

            const accesstoken = createAccessToken({ id: newUser.id })
            const refreshToken = createRefreshToken({ id: newUser.id })

            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/user/refresh_token'
            })

            res.json({ accesstoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: async (req, res) => {
        try {

            const rf_token = req.cookies.refreshtoken

            if (!rf_token) return res.status(400).json({ msg: "Please Login or Registers.." })
            jwt.verify(rf_token, process.env.Refresh_Secret, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ user, accesstoken })

            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { password, email } = req.body;
            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "User does not Exit" })

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

            const accesstoken = createAccessToken({ id: user.id })
            const refreshtoken = createRefreshToken({ id: user.id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/user/refresh_token'
            });

            res.json({ accesstoken });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
            return res.json({ msg: ' ✅ Log Out' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {

            const user = await Users.findById(req.user.id).select('-password');
            if (!user) return res.status(400).json({ msg: 'User Not Found' })
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            if (!user) return res.status(400).json({ msg: "User does not exist." });

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            });

            return res.json({ msg: "Cart updated" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    addminDetail: async (req, res) => {
        try {
            const admin = await Users.findOne();
            res.json(admin);
        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    }

}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.Access_Secret, { expiresIn: '10h' });

}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.Refresh_Secret, { expiresIn: '24h' });
}
module.exports = userCtrl
