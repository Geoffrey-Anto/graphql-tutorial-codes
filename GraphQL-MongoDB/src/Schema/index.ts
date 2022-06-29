import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  pincode: Number,
});

export const Address = mongoose.model("Address", addressSchema);

const postSchema = new mongoose.Schema({
  image: String,
  title: String,
});

export const Post = mongoose.model("Post", postSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  address: addressSchema,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

export const User = mongoose.model("User", UserSchema);
