const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Coupon Code name!"],
    unique: true,
 },
 value:{
    type: Number,
 },
 minAmount:{
    type: Number,
 },
 maxAmount:{
    type: Number,
 },
 shopId:{
    type: Object,
    required: true,
 },
 selectedProduct:{
   type: String,
 },
 createdAt : {
    type: Date,
    default: Date.now(),
 },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);