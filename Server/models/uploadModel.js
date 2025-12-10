const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  image: {
    public_id: String,
    url: String
  }
});

module.exports = mongoose.model('Upload', uploadSchema);