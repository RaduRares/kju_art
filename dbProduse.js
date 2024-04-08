import mongoose from 'mongoose'

const produsSchema=mongoose.Schema({
id:Number,
title:String,
marime:String,
descriere:String,
image:String,
price:Number,
rating:Number,




});
export default mongoose.model("produscontents", produsSchema);