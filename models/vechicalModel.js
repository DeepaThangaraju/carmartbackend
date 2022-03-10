import mongoose from "mongoose";
import { userModel } from "./userModel.js";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: userModel.modelName,
    }
  },
  {
    timeStamps: true,
  }
);

const vechicalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: userModel.modelName,
    },
    name: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    totalReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock:{
      type: Number,
      required: true,
      default: 0,
    },
    video: {
      type: String,
      required: true,
    },
    milage: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const vechicalModel = mongoose.model("vechical", vechicalSchema);
