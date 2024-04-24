const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  assembly: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: false,
  },
 
});

const District = mongoose.model('Assembly', districtSchema);

module.exports = District;