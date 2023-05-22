import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
payment: {},
buyer: {
type: mongoose.Schema.Types.ObjectId,
ref: 'users',
},
status: {
type: String,
default: 'Not Process',

},
shippingAddress:{
type: mongoose.Schema.Types.ObjectId,
ref: 'address',
},
products: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Products',
}],

}, { timestamps: true });

export default mongoose.model('Orders', ordersSchema);                                                                                                                                                                                                                                                                                                                                                                                                      