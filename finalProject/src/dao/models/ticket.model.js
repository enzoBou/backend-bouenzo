import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});

const ticketModel = mongoose.model('Ticket', ticketSchema);

export default ticketModel;
