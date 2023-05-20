import mongoose, {model} from "mongoose";
const {Schema} = mongoose;


const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    }, 
    description: {
      type: String,
      required:true
    },
  });


  export  const productsmodel = mongoose.model('Products',productSchema)