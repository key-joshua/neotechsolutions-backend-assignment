import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const EmployeesSchema = new Schema({
  banned: { type: Boolean, default: false },
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  phone: { type: String, required: [true, 'Phone is required'] },
  employmentDate: { type: String, required: [true, 'Date of employment is required'] },
  birthDate: { type: String, required: [true, 'Date of Birth is required'] },
  home: [{
    city: { type: String, required: [true, 'City is required'] },
    ZIPCode: { type: String, required: [true, 'ZIP Code is required'] },
    AddressLine1: { type: String, required: [true, 'AddressLine1 is required'] },
    AddressLine2: { type: String, required: [true, 'AddressLine2 is required'] }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Employees', EmployeesSchema);
