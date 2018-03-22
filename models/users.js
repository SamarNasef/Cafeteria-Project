var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;
var users=new Schema({
  _id:Number,
  name:String,
  email:String,
  password:String,
  roomNo:String,
  ext:String,
  image:String,
  
});

users.plugin(mongoosePaginate);

mongoose.model("users",users);