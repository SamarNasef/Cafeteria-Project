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

router.get('/myOrder',function(req,resp){
    
    mongoose.model('orders').find({},function(err,result)
    {    
        mongoose.model('orders').populate(result,{path:"order",select:"orderDate"},function(err,result){
         
        if(!err){
            resp.render('user/myOrder',{data:result,msg:req.flash('msg')});
        }
        else{
           resp.render(err);
        }
    })
    })
});
router.get('/component',function(req,resp){
     
    mongoose.model('orders').find({orderDate:req.query.orderDate},{component:true , _id:false},function(err,doc){
        
        if(!err){
            

            resp.json(doc);
        }
        else{
           resp.render(err);
        }
    })
});
router.get('/componentDetails',function(req,resp){

    mongoose.model('products').find({proname:req.query.name},function(err,doc){
        
        if(!err){
            resp.json(doc);
        }
        else{
           resp.render(err);
        }
    })

});
router.get('/search',function(req,resp){
    mongoose.model('orders').find({$and:[{orderDate:{$lte:req.query.dateTo}},{orderDate:{$gte:req.query.dateFrom}}]},function(err,doc){
        if(!err){
           resp.json(doc);
        }
        else{
           resp.render(err);
        }
    })
});

module.exports=router;