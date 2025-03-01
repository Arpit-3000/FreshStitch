const mongoose = require("mongoose");

const orderSchema =  new mongoose.Schema({

    pickupDate: {type:String},
    pickupTime: {type:String},
    contactName: {type:String},
    email: {type:String},
    mobileNumber:{type:String},
    address:{type:String},
    paymentMethod: {type:String},
    orderDate: { type: Date, default: Date.now },
    subtotal:{type:Number},
    DeliveryCharge:{type:Number},
    grandtotal:{type:Number},
    items: [
    {
      name: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    }
  ]
});

module.exports = mongoose.model("orders",orderSchema);