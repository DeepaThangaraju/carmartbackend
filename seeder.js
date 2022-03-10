
import dotenv from "dotenv";
import { users } from "./data/user.js";
import { vechicals } from "./data/vechical.js";
import {userModel} from "./models/userModel.js";
import {vechicalModel} from "./models/vechicalModel.js";
import {orderModel} from "./models/orderModel.js";
import { createConnection } from "./connection/db.js";

dotenv.config();
createConnection();

const importData=async ()=>{
    try{
        await orderModel.deleteMany()
        await vechicalModel.deleteMany()
        await userModel.deleteMany()
        const createUser=await userModel.insertMany(users)
        const adminUser=createUser[0]._id;
        const sampleVechical=vechicals.map(vechical=>{
            return {...vechical,user :adminUser}
        })
        await vechicalModel.insertMany(sampleVechical);
        console.log("data imported");
        process.exit()
    }catch(error){
      console.error(`${error}`);
      process.exit(1);
    }
}


const destroyData=async ()=>{
    try{
        await orderModel.deleteMany()
        await vechicalModel.deleteMany()
        await userModel.deleteMany()
        console.log("data destroyed");
        process.exit()
    }catch(error){
      console.error(`${error}`);
      process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}else{
    importData()
}