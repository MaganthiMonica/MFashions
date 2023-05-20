import express from "express";
import { usermodule } from "../models/schema.js";
import { body, validationResult } from "express-validator";
export const register = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_STRING = "abcd";
//route register using post method, /api/create
register.post(
  "/create",
  //datavalidation
  body("name", "enter propername").isLength({ min: 3 }),
  body("email", "enter valid email").isEmail(),
  body("phone", "enter valid phone number").isLength({ min: 10 }),
  body("password", "enter proper password min 5").isLength({ min: 3 }),
  async (req, res) => {
    //if errors return bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    //hashing the password
    const passocde = await bcrypt.hash(req.body.password, 5);
    //create a user
    const usercreate = await usermodule.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: passocde,
    });

    console.log("successfully registered in to database mongodb");

    //JWT token
    let data = {
      //payload
      id: usercreate._id,
    };
    let token = jwt.sign(data, JWT_STRING);
    res.json(token);
  }
);
