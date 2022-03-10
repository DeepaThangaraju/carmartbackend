import { userModel } from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../JWT/generateToken.js";

export function authUers() {
    return asyncHandler(async (req, res) => {
      const { email,password }=req.body;
      const user =await userModel.findOne({email})
      if(user && (await user.matchPassword(password))){
           res.json({
             _id:user._id,
             name:user.name,
             email:user.email,
             isAdmin:user.isAdmin,
             token:generateToken(user._id)
           })
      }else{
        res.status(401)
        throw new Error("Invalid credentials");
      }
    });
  }

  export function registerUser() {
    return asyncHandler(async (req, res) => {
      const { name,email,password }=req.body;
      const userExits =await userModel.findOne({email})
      if(userExits){
        res.status(401)
        throw new Error("invalid credentials")
        
      }
      const user=await userModel.create({   //similar to save
        name,
        email,
        password
      })
      if(user){
        res.status(201).json({
          _id:user._id,
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin,
          token:generateToken(user._id)
        })
      }else{
        res.status(400)
        throw new Error("Invalid Credentials")
      }
  })
}


  export function getUserProfile() {
    return asyncHandler(async (req, res) => {
          const user=await userModel.findById(req.user._id)
          if(user){
            res.json({
              _id:user._id,
              name:user.name,
              email:user.email,
              isAdmin:user.isAdmin,
            })
          }else{
            res.status(401)
            throw new Error("Invalid credentials");
          }
          
    })
  }


  export function updateUserProfile() {
    return asyncHandler(async (req, res) => {
          const user=await userModel.findById(req.user._id)
          if(user){
           user.name=req.body.name||user.name
           user.email=req.body.email||user.email
           if(req.body.password){
             user.password=req.body.password
           }
           const updatedUser=await user.save();
           res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
          })
          }else{
            res.status(401)
            throw new Error("Invalid credentials");
          }
          
    })
  }

  export function getAllUsers() {
    return asyncHandler(async (req, res) => {
          const users=await userModel.find({})
         res.json(users)
          
    })
  }

  export function deleteUser() {
    return asyncHandler(async (req, res) => {
          const user=await userModel.findById(req.params.id)
        if(user){
          await user.remove()
          res.json({message:'User Removed'})
        }else{
          res.status(404)
          throw new Error('User not found')
        }
          
    })
  }

  export function getUserById() {
    return asyncHandler(async (req, res) => {
          const user=await userModel.findById(req.params.id).select('-password')
          if(user){
         res.json(user)
          }else{
            res.status(404)
            throw new Error('User not found')
          }
          
    })
  }

  export function updateUser() {
    return asyncHandler(async (req, res) => {
          const user=await userModel.findById(req.params.id)
          if(user){
           user.name=req.body.name||user.name
           user.email=req.body.email||user.email
           user.isAdmin=req.body.isAdmin || user.isAdmin

           const updatedUser=await user.save();
           res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
          })
          }else{
            res.status(401)
            throw new Error("Invalid credentials");
          }
          
    })
  }

