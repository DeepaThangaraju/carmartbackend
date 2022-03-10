import { vechicalModel } from "../models/vechicalModel.js";
import asyncHandler from "express-async-handler";

export function getVechicalById() {
  return asyncHandler(async (req, res) => {
    const vechical = await vechicalModel.findById(req.params.id);
    if (vechical) {
      res.json(vechical);
    } else {
      res.status(404);
      throw new Error("vechical not found");
    }
  });
}
export function getVechicals() {
  return asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await vechicalModel.countDocuments({ ...keyword });
    const vechicals = await vechicalModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ vechicals, page, pages: Math.ceil(count / pageSize) });
  });
}

export function deleteVechical() {
  return asyncHandler(async (req, res) => {
    const vechical = await vechicalModel.findById(req.params.id);
    if (vechical) {
      await vechical.remove();
      res.json({ message: "vechical removed" });
    } else {
      res.status(404);
      throw new Error("vechical not found");
    }
  });
}

export function createVechical() {
  return asyncHandler(async (req, res) => {
    const vechical = new vechicalModel({
      name: "sample name",
      price: 0,
      user: req.user._id,
      pic: "/image/sample.jpg",
      video: "https:/sample",
      brand: "hyunadai",
      category: "sedan",
      milage: "0",
      countInStock: 0,
      totalReviews: 0,
      description: "sample description",
    });

    const createdVechical = await vechical.save();
    res.status(201).json(createdVechical);
  });
}

export function updateVechical() {
  return asyncHandler(async (req, res) => {
    const {
      name,
      price,
      pic,
      description,
      brand,
      category,
      video,
      milage,
      countInStock,
    } = req.body;
    const vechical = await vechicalModel.findById(req.params.id);
    if (vechical) {
      vechical.name = name;
      vechical.price = price;
      vechical.pic = pic;
      vechical.description = description;
      vechical.brand = brand;
      vechical.category = category;
      vechical.countInStock = countInStock;
      vechical.milage = milage;
      vechical.video = video;
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
    const updatedVechical = await vechical.save();
    res.status(201).json(updatedVechical);
  });
}

export function reviewVechical() {
  return asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    // const vechicals = getVechicals();
    const vechical = await vechicalModel.findById(req.params.id);
    if (vechical) {
      const alreadyReviewed = vechical.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Already reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      vechical.reviews.push(review);
      vechical.totalReviews = vechical.reviews.length;
      vechical.rating =
        vechical.reviews.reduce((acc, item) => item.rating + acc, 0) /
        vechical.reviews.length;

      await vechical.save();
      res.status(201).json({ message: "Reviews added" });
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
    const updatedVechical = await vechical.save();
    res.status(201).json(updatedVechical);
  });
}

export function getTopVechical() {
  return asyncHandler(async (req, res) => {
   const vechicals=await vechicalModel.find({})
   res.json(vechicals)
})
}

