const express = require('express');
const mongoose = require('mongoose');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const Port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookiesParser());

app.use(cors({
    origin: 'https://genxmart.netlify.app',
    credentials: true
}));
app.listen(Port, () => {
    console.log('Server is Running....')
})


//Router
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/paymentRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/mobileRouter'))
app.use('/api', require('./routes/fashionRouter'))
app.use('/api', require('./routes/addressRouter'));
app.use('/api', require('./routes/uploadRouter'))

//Connect MongoDB
const uri = process.env.URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
})

