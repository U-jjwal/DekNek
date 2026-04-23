import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true, //TO activate searching field in database in more optimise wase we use index:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
});


export const User = mongoose.model("User",userSchema)