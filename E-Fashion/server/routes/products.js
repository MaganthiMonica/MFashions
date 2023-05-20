import express from "express";
import {productsmodel} from "../models/Products.js";


export const routerProduct = express.Router()

// Route 1, GET method all products
routerProduct.get('/get_product', async (req, res) => {
    try {
        // Validate request parameters if any

        const products = await productsmodel.find({})

        // Send a 404 Not Found response if no products are found
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' })
        }

        res.status(200).json({ success: true, countTotal: products.length, products })
    } catch (error) {
        console.error(error.message)

 

        res.status(500).send('Internal Server Error')
    }
})


