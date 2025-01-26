import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{13}$/, 
    unique: false
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{11}$/,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  remarks: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

const Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema);

export default Beneficiary;
