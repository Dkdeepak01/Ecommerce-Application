var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var responseData={
    isUserLogedIn:req.session.isUserLogedIn
  }
  res.send(JSON.stringify(responseData));
});

module.exports = router;
