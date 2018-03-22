var express=require('express');
var router= express.Router();
var bodyParser=require('body-parser');
var bodyParserMid=bodyParser.urlencoded();
var fs=require('fs');
var multer=require('multer');
var mongoose=require('mongoose');

var uploadMid=multer({
    dest:"./public/img" 
  })

  router.get('/',function(req,resp){
    resp.render('admin/orderAdmin',{data:"any data"});

   
});

module.exports=router;