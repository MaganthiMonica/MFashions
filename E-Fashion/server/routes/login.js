import express from "express";
import { usermodule } from "../models/schema.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
export const loginRouter = express.Router();
import jwt from "jsonwebtoken";
const JWT_STRING = "abcd";

//router login
loginRouter.post(
  "/login",
  //datavalidation
  body("email", "enter valid email id ").isEmail(),
  body("password", "password cannot be empty").exists(),
  async (req, res) => {
    //if errors return bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check for th user emailid
      const userdoc = await usermodule.findOne({ email: req.body.email });
      console.log(userdoc)
      if(!userdoc){
        return res.status(400).json({errors:"Not avaiable"})
      }
      //comparing the user entered password with password in database
      const validPassword = await bcrypt.compare(req.body.password,userdoc.password);
      if (!validPassword) {
        return res.status(400).send({ status: "error", message: "Invalid email or password" });
      }
      console.log(userdoc);
      console.log(req.body.password);
      if (userdoc) {
        console.log("Login success");
      } else {
        console.log("Incorrect password");
        res.status(400).json("Incorrect credentials");
      }
      //JWT token
      let data = {
        //payload
        id: userdoc._id,
      };
      let token = jwt.sign(data, JWT_STRING,{expiresIn :'10h'});
      res.json({ ticket: token });
    } catch (error) {
      // res.status(400).json("Internal server");
    
      console.log(error);
    }
  }
)