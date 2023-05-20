import express from "express";
import{allverifytoken} from "../middleware/middleware.js";
import { usermodule } from "../models/schema.js";
// import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const profile = express.Router()
profile.get("/profile",allverifytoken,
async(req,res)=>{
    
    

    try{
        const user=await usermodule
        .findOne({_id:req.id},{_id:0,name:1,email:1,phone:1})
        if(!user){
            return
            res.status(400).send({errors:"authontecation  wrong"})
        }
        res.status(200).send(user)
    }
    catch(errors)
    {
        res.status(400).send({errors:"some intervels server error"})
    }
}
);
