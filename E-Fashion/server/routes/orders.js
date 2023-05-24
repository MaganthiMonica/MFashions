import{allverifytoken} from "../middleware/middleware.js";
import express from "express";
import ordersSchema from "../models/Orders.js"

const routerOrder = express.Router();

export default routerOrder;



routerOrder.get("/getOrders", allverifytoken, async (req, res) => {
  try {
    const orders = await ordersSchema.find({ buyer: req.id })

      .populate("products").populate("shippingAddress")
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


routerOrder.put("/cancelOrders/:orderId", allverifytoken, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = await ordersSchema.findByIdAndUpdate(orderId, { 
      status: 'Cancelled',
      payment: {
        success: false
      }
    }, { new: true });
    

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }



    res.json({ success: true, message: 'Order Cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});