const cloudinary = require('../middleware/cloudinary');
const Upload = require('../models/uploadModel');

const uploadCtrl = {
  image: async (req, res) => {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer); 
      });

     Upload({
        image: {
          public_id: result.public_id,
          url: result.secure_url
        }
      });
      res.json({ msg: 'Image uploaded',  image: {
          public_id: result.public_id,
          url: result.secure_url
        } });

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = uploadCtrl;
