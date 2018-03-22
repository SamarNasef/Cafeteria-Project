var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;
var orders=new Schema({
  _id:Number,
  orderDate:String,
  status:String,
  totalPrice:String,
  action:String,
  notes:String,
  roomNo:String,
  component:[{name:String,number:Number}]

});

orders.plugin(mongoosePaginate);

mongoose.model("orders",orders);