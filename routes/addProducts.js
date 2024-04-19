var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");


async function getDbConnection(productDetails) {
    await mongoClient.connect();
    var db = mongoClient.db("onlineApp");
    var collection = db.collection("productData");
    return collection.insertOne(productDetails);
  }

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
  var responseData={};
 
  getDbConnection(req.body).then((response)=>{
    if (response.insertedId) {
        responseData.msg="Success";
    }
    else{
        responseData.msg="Error";
    }
    res.send(JSON.stringify(responseData));
  })
 

});

module.exports = router;
