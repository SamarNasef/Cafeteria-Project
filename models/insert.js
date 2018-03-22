var mongodb = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/cafeDB';
mongodb.connect(url,function (err,db) {
    if(err){
        throw err;
    }
    console.log('Database Created !');

    var info ={name:"Maltedmilk",price:"13"};
     db.collection('meal').insertOne(info,function (err,result) {
         if(err){
             throw err;
         }
         console.log('collection Created !');
         db.close();
     });

    db.close();
});


