var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
const bcrypt = require("bcrypt");

async function getDbConnection(InputData) {
  await mongoClient.connect();
  var db = mongoClient.db("onlineApp");
  var collection = db.collection("studentDetails");
  var result = collection
    .find({ userName: InputData.userName /*, Password: InputData.Password*/ })
    .toArray();
  return result;
}

///For get :
/*router.get("/", (req, res) => {
  console.log(req.query);
  var responseData = {};
  if (req.query.Username == "Mahadev" && req.query.Password == "Mahadev123") {
    responseData.msg = "Success";
  } else {
    responseData.msg = "Invalid!!";
  }
  res.end(JSON.stringify(responseData));

  //   console.log("yeey!!!");
  //   res.send("Webservice Created");
});
*/

///For Post:

router.post("/", (req, res) => {
  console.log(req.body);
  var responseData = {};
  /*
  if (req.body.Username == "Mahadev" && req.body.Password == "Mahadev123") {
    responseData.msg = "Valid";
  } else {
    responseData.msg = "Invalid!!";
  }
  */
  getDbConnection(req.body)
    .then((results) => {
      console.log(results);
      if (results.length) {
        bcrypt.compare(
          req.body.Password,
          results[0].Password,
          function (err, result) {
            if (result) {
              responseData.msg = "Valid";
                 req.session.isUserLogedIn=true;
              if (results[0].isAdmin) {
                responseData.isAdmin = true;
              }
            }
            res.send(JSON.stringify(responseData));
          }
        );
      } else {
        responseData.msg = "Invalid";
        res.send(JSON.stringify(responseData));
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
