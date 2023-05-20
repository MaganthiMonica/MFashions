import mongoose from "mongoose";
// DB connection file
const mongourl = 'mongodb://127.0.0.1:27017/E-Fashion';  //connection URL

const mongodb = async()=>{
    try{
        const result= await mongoose.connect(mongourl)
        console.log("Connected")
    }
    catch{
        console.log(error)
    }
}
    
export default mongodb

