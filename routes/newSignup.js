var express = require("express");
var router = express.Router();

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getDbConnection(InputData) {
  await mongoClient.connect();
  var db = mongoClient.db("onlineApp");
  var collection = db.collection("studentDetails");
  return collection.insertOne(InputData);
}

/* GET home page. */
router.post("/", function (req, res, next) {
  var userDetail = req.body;
  var responseData = {};
  bcrypt.hash(userDetail.Password, saltRounds, function (err, hash) {
    userDetail.Password = hash;
    getDbConnection(req.body)
      .then((response) => {
        if (response.insertedId) {
          responseData.msg = "Inserted";
        } else {
          responseData.msg = "error";
        }

        res.send(JSON.stringify(responseData));
      })
      .catch((error) => {});
  });
});

module.exports = router;
