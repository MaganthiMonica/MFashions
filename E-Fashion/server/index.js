import express from "express";
import mongodb from "./database.js";
import { register } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import {profile} from "./routes/profile.js"
import {router} from './routes/address.js'
import paymentRouter from './routes/payment.js'
import {routerProduct} from './routes/products.js'
import routerOrder from "./routes/orders.js"
const app = express();
const port = 5000;
mongodb(); //DB connection

import cors from "cors"; //frontend backend connnectivity policy
app.use(cors());

app.use(express.json()); //middlevare

//  calling the routes files
app.use("/api", register);
app.use("/api", loginRouter);
app.use("/api", profile);
app.use("/api", router)
app.use("/api", routerProduct)
app.use("/api", paymentRouter)
app.use("/api",routerOrder);




app.listen(port, () => {
  //listening to the port
  console.log(`Example app listening on port ${port}`);
});
