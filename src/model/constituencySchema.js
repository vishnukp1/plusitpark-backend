const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
  constituency: {
    type: String,
    required: true,
  },
  assembly: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assembly',
  }],
});

const constituency = mongoose.model('Constituency', constituencySchema);

module.exports = constituency;