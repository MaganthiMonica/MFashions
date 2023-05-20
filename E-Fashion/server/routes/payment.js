import brainTree from "braintree";
import dotenv from "dotenv";
import express from "express";
import {productsmodel} from "../models/Products.js";
import{allverifytoken} from "../middleware/middleware.js";
import ordersSchema from "../models/Orders.js"
dotenv.config();
const paymentRouter = express.Router();

const gateway = new brainTree.BraintreeGateway({
  environment: brainTree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY,
});

// Route 1, Token
paymentRouter.get("/brainTree/token", async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        res.status(200).send(response);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// route 2, payment
paymentRouter.post("/brainTree/payment", allverifytoken, async (req, res) => {
    try {
      const { nonce, cartItems } = req.body;
      const productIds = cartItems.map((i) => i._id);
      const numberOfQty = cartItems.map((i) => i.numberOfQuantity);
      console.log(cartItems)


  
      const products = await productsmodel.find({ _id: { $in: productIds } });
      let total = 0;
     
      products.forEach((p) => {
        const item = cartItems.find((i) => i._id.toString() === p._id.toString());
        if (item) {
          const numberOfQuantity = item.numberOfQuantity;
          total += p.price * numberOfQuantity;
        }
      });
  
      console.log("Total: ", total);
  
      const result = await new Promise((resolve, reject) => {
        gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: { submitForSettlement: true },
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
  
      if (result.success) {
        const order = new ordersSchema({
           
            products: products,
            payment: result,
            buyer: req.id,
          
          });
        
          // Save the order
          const savedOrder = await order.save();
      res.status(200).json({ ok: true });
      } else {
        console.error(result.message);
        res.status(500).send("Payment Failed");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  

export default paymentRouter;
