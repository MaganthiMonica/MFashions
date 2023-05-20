import{allverifytoken} from "../middleware/middleware.js";
import ordersSchema from "../models/Orders.js"
import express from "express";

const routerOrder = express.Router();

export default routerOrder;



routerOrder.get("/getOrders", allverifytoken, async (req, res) => {
  try {
    const orders = await ordersSchema.find({ buyer: req.id })

      .populate("products")
      .populate("buyer", "name");

    return res.status(200).json(orders);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while fetching the orders!",
      error,
    });
  }
});