const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
  },
  image: {
    url: {
      type: String, // Store the URL of the image hosted on Cloudinary
    },
    public_id: {
      type: String, // Store the public ID of the image on Cloudinary (optional but useful)
    },
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
