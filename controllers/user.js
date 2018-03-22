var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bodyParserMid = bodyParser.urlencoded;
var mongodb = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cafeDB';

router.get('/lists',function(req,resp){
    console.log(req.query);
    var quer=req.query;
    console.log(quer.Msg[0]);
});
router.get('/list',function(req,resp){
    var username = "Eman";//req.body.username;
    mongodb.connect(url,function (err,db) {

        if (err) {
            throw err;
        }
        console.log("conected Db");

        var query = {name: -1};
        db.collection("meal").find().sort(query).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            console.log(result);
            resp.locals={
                user:username,
                resultsmeal:result
            }
            resp.render('users/list');

        });
        db.close();
    });


});


module.exports =router;
