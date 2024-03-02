const mongoose  = require("mongoose");

productSchema=new mongoose.Schema({
    name:String,
    brand:String,
    price:Number,
    userId:String
});

module.exports=model=mongoose.model('products',productSchema);