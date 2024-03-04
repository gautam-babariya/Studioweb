const mongoose = require('mongoose');

const addvideoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

// const Product = mongoose.model('Product', productSchema);
module.exports = mongoose.model('addvideo', addvideoSchema);

// module.exports = Product;
