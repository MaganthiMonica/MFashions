import express from "express";
import{allverifytoken} from "../middleware/middleware.js";
import {addressmodel} from "../models/AddressSchema.js";

export const router = express.Router()
router.get('/get_address', allverifytoken, async (req, res) => {
    try {
       
        const userAddresses = await addressmodel.find({user: req.id });
      if (!userAddresses || userAddresses.length === 0) {
        return res.status(404).json({ message: 'User addresses not found' });
      }
      res.status(200).json({ addresses: userAddresses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.post('/new_address', allverifytoken, async (req, res) => {
    try {
      // Check if all required fields are present
      const { houseNumber, street, city, state, country, zipCode } = req.body;
      if (!houseNumber || !street || !city || !state || !country || !zipCode) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const userAddress = new addressmodel({
        user: req.id,
        houseNumber: houseNumber,
        street: street,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode
      });
  
      const existingAddress = await addressmodel.findOne({
        
        houseNumber: req.body.houseNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode
      });
      
      if (existingAddress) {
        return res.status(400).json({ message: 'Address already exists' });
      }
      
      const savedAddress = await userAddress.save();
      res.status(201).json({ address: savedAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });



  // Delete Address DELETE method  - login req
router.delete("/address/deleteAddress/:id", allverifytoken, async (req, res) => { 
 // destructing method
  const { id } = req.params;
  console.log (req.params)

  try {
    const address = await addressmodel.findOne({ _id: id, user: req.id });
    if (!address) {
      return res.status(404).send("Address not found");
    }
    await addressmodel.deleteOne({ _id: id });
    res.json({ success: "Address deleted successfully" });
  } catch (error) {

    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.put("/address/editAddress/:id", allverifytoken, async (req, res) => {
  try {
    // destructing
    const { houseNumber, city, state, country,zipCode, street } = req.body;
    // Create a new Address Obj
    const newAddress = {};
    if (houseNumber) {
      newAddress.houseNumber = houseNumber;
    }
    if (city) {
      newAddress.city = city;
    }
    if (state) {
      newAddress.state = state;
    } 
    if (street) {
      newAddress.street = street;
    }
    if (country) {
      newAddress.country = country;
    }

    if (zipCode) {
      newAddress.zipCode = zipCode;
    }
    // Find the note to updated and update it
    let address = await addressmodel.findById(req.params.id);
    if (!address) {
      return res.status(404).send("Address not found");
    }
    if (address.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }
    address = await addressmodel.findByIdAndUpdate(
      req.params.id,
      { $set: newAddress },
      { new: true }
    );
    res.json({success:true,  address });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
