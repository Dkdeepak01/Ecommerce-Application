var loadselectedPage = (type) => {
  let templateUrl;

  switch (type) {
    case "login":
      templateUrl = "templates/login.htm";
      break;
    case "newuser":
      templateUrl = "templates/newuser.htm";
      break;
    case "forget":
      templateUrl = "templates/forget.htm";
      break;
    case "productDetail":
      templateUrl = "templates/productDetail.htm";
      break;
    case "adminPage":
      templateUrl = "templates/adminPage.htm";
      break;
  }

  loadData(templateUrl, type);
};

var loadData = (templateurl, type) => {
  axios
    .get(templateurl)
    .then(function (response) {
      // handle success
      console.log(response);
      // console.log(response.data);
      $("main").html(response.data);
      if (type == "productDetail") {
        getProductDetail();
      } else if (type == "login") {
        if (localStorage.getItem("userCredential") != null) {
          var users = JSON.parse(localStorage.getItem("userCredential"));
          $("#accid").val(users.userName);
          $("#accpwd").val(users.Password);
        }
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};
axios.get("/check/user/login").then((response)=>{
  if(response.data && response.data.isUserLogedIn){
    loadselectedPage("productDetail");
  }
  else{
    loadselectedPage("login");
  }
})


var newuserSignup = () => {
  var usrDtl = {};
  usrDtl.userName = $("#accid").val();
  usrDtl.Password = $("#accpwd").val();
  usrDtl.Email = $("#accmail").val();
  console.log(usrDtl);

  axios
    .post("/new/user/login", usrDtl)
    .then((response) => {
      console.log("Successfully comunicated");
      if (response.data.msg == "Inserted") {
        $(".insertMsg").show();
      }
    })
    .catch((error) => {
      console.log(error);
    });

};
var logOutUser=()=>{
  axios.get("/log/out/user").then(()=>{
    loadselectedPage("login");
  })
}
