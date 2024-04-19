var validateUserCredntial = () => {
  var accountDetail = {};
  accountDetail.userName = $("#accid").val();
  accountDetail.Password = $("#accpwd").val();
  //for Get communication

  /*axios({
    method: "GET",
    url: "http://localhost:5000/users/login/data",
    params: accountDetail,
  })
    .then((response) => {
      console.log(response);
    })
    .catch(() => {});*/

  //   loadselectedPage("productDetail");

  //for Post
  var isChecked = document.querySelector("#chk").checked;
  if (isChecked) {
    //alert("Checked");
    localStorage.setItem("userCredential", JSON.stringify(accountDetail));
  } else {
    localStorage.removeItem("userCredential");
  }

  axios({
    method: "POST",
    url: "http://localhost:5000/users/login/data",
    data: accountDetail,
  })
    .then((response) => {
      console.log(response);
      if (response.data.msg == "Valid") {
        if (response.data.isAdmin) {
          loadselectedPage("adminPage");
        } else {
          loadselectedPage("productDetail");
        }
      } else {
        document.querySelector(".errors").style.display = "block";
      }
    })
    .catch(() => {});
};
