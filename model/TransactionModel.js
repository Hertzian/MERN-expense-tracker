const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, 'Please add some text'],
    },
    amount: {
      type: Number,
      required: [true, 'Add a positive or negative number'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Transaction', TransactionSchema)
