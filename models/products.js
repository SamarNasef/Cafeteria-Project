var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;
var products=new Schema({
  _id:Number,
  name:String,
  price:Number,
  category:String,
  image:String

});

products.plugin(mongoosePaginate);

mongoose.model("products",products);