const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/paymentModel');

const paymentCtrl = {
  createPayment: async (req, res) => {
    try {
      const user_id = req.user.id;
      const { cartItems, address } = req.body;

      if (!cartItems || !cartItems.length || !user_id || !address) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const line_items = cartItems.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.title,
            images: [item?.image?.url || 'https://placeholder.url/no-image.png'],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: '/success',
        cancel_url: '/cancel',
        metadata: {
          user_id
        }
      });

      const payment = new Payment({
        user_id,
        cart: cartItems,
        address,
        paymentID: session.id,
        total: totalAmount,
      });

      await payment.save();
      res.json({ id: session.id });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  getPaymentsByUser: async (req, res) => {
    try {
      const user_id = req.user.id;

      const payments = await Payment.find({ user_id }).sort({ createdAt: -1 });

      res.json(payments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  }

};

module.exports = paymentCtrl;
