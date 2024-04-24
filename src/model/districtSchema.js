
const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
  },
  constituencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Constituency',
  }],
});

const District = mongoose.model('District', districtSchema);

module.exports = District;
