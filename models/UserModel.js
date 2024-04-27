import { Schema, model } from 'mongoose';

const userSchema = Schema({
  
    username: {
      type: String,
      required: true,
      trim: true,
    },
    FirstName:{
      type: String,
      required: true,
      trim: true,
    },
    LastName:{
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    isEmailVerified:{
      type: Number,
      default: 0, 
    },
    token:{
      type:String,
      default:''
    }
  },
  { timestamps: true }
);
const User = model('User', userSchema);
export default User;
