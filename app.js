var express=require('express');
var server=express();

var authRoutes=require('./controllers/auth');
var addProductRoutes=require('./controllers/AddProduct');
var usersRoutes=require('./controllers/Users');
var myOrdersRoutes=require('./controllers/MyOrders');
var addUserRoutes=require('./controllers/AddUser');
var adminHomeRoutes=require('./controllers/AdminHome');
var checksRoutes=require('./controllers/Checks');
var orderAdminRoutes=require('./controllers/OrderAdmin');
var orderUserRoutes=require('./controllers/OrderUser');
var productsRoutes=require('./controllers/Products');


var session=require('express-session');
var flash =require('connect-flash');
var mongoose=require('mongoose');

require('./models/products');
require('./models/users');
require('./models/orders'); 
require('./models/categories');

server.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/cafeDB');

server.use(express.static('public'));
server.use(session({
  secret:"@#%#$^$%",
  cookie:{maxAge:1000*60*60*7}
}));


server.use(flash()); 
server.use('/auth',authRoutes);

server.use(function(req,resp,next){
  if(!(req.session.username&&req.session.password)){
  
    resp.redirect('/auth/login');
  }
  else{
    resp.locals={
     username:req.session.username
    }
    next();
    

  }
})


server.use('/addProduct',addProductRoutes);
server.use('/users',usersRoutes);
server.use('/myOrders',myOrdersRoutes);
server.use('/addUser',addUserRoutes);
server.use('/adminHome',adminHomeRoutes);
server.use('/checks',checksRoutes);
server.use('/orderAdmin',orderAdminRoutes);
server.use('/orderUser',orderUserRoutes);
server.use('/products',productsRoutes);

 server.set('view engine','ejs');
 server.set('views','./views');




server.listen (9090,function(){
  console.log("starting....");
});
