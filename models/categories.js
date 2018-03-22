var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;
var categories=new Schema({
  _id:Number,
  name:String

});

categories.plugin(mongoosePaginate);

mongoose.model("categories",categories);