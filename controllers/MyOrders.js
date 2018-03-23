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
        console.log(doc[0].component);
        compArr=[];
        compArr.push(doc[0].component);
        var compData={};
        if(!err){
            for(var i=0;i<doc[0].component.length;i++){
              
        
                mongoose.model('products').find({name:doc[0].component[i].name},function(err,doc2){
                    compArr.push(doc2[0]);
                   if(compArr.length == doc[0].component.length+1)
                    resp.json(compArr);
                   
                })
               
            }
            
           // resp.json(doc[0].component);
        }
        else{
           resp.render(err);
        }
    })
});
router.get('/componentDetails',function(req,resp){

    mongoose.model('products').find({name:req.query.name},function(err,doc){
        
        if(!err){
            console.log(doc);
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

router.get('/add',function(req,resp){
    var OrderModel=mongoose.model('orders');
    var order=new OrderModel({ 
     _id:3,
  orderDate:"2018-02-16",
  status:"out for delivery",
  totalPrice:"60",
  action:"no action",
  component:[{name:"tea",number:2}]
  
     
   });
   order.save(function(err,doc){
   
       resp.send('done');
    //resp.json(doc ); 

   })

});


router.get('/pro',function(req,resp){


    var OrderModel=mongoose.model('products');
    var order=new OrderModel({ 
     _id:1,
  name:"tea",
  price:3,
  category:"hot drinks",
  
  
     
   });
   order.save(function(err,doc){
   
       resp.send('done');
    //resp.json(doc ); 

   })

});

module.exports=router;