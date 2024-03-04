import mongoose  from "mongoose";
import validator from "validator";
import { string } from 'zod';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password:string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

const schema  = new mongoose.Schema({
_id:{
    type: 'string',
    required:[true,"Please Enter Id"]
},
name:{
type: 'string',
required:[true,"Please Enter Name"]
},
email:{
type: 'string',
required:[true,"Please Enter email Address"],
unique:[true,"email already exists"],
validator:validator.default.isEmail
},
password:{
type:"string"
},
photo:{
 type: 'string',
default: ''
},
role:{
    type: 'string',
    enum:["admin", "user"],
    default: 'user'
},
// gender:{
//     type: 'string',
//     enum:["male", "female"],
//     required:[true,"Please Enter Gender"]
// },
// dob:{
//     type : Date,
//     required: [true, "Please enter Date of birth"],
// },

},{timestamps:true})

// schema.virtual("age").get(function () {
//   const today = new Date();
//   const dob = this.dob;
//   let age = today.getFullYear() - dob.getFullYear();

//   if (
//     today.getMonth() < dob.getMonth() ||
//     (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
//   ) {
//     age--;
//   }

//   return age;
// });
export const User = mongoose.model<IUser>('User',schema)