//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
let Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String},
  contact_no: {type :Number},
  age: {type :Number},
  password: {type:String}
});
const Employee = mongoose.model('Employee', EmployeeSchema );
export default Employee;