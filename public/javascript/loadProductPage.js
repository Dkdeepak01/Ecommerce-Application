var productDataTemplate;
var productDataList = [];

var getProductDetail = (categoryType) => {
  var dataApi = "/product/page/data";
  var data = {};
  if (categoryType) {
    data.categoryType = categoryType;
  }
  axios({
    method: "GET",
    url: dataApi,
    params: {
      data: data,
    },
  })
    .then((response) => {
      console.log(response);
      productDataList = response.data;
      showProductsData();
    })
    .catch((error) => {
      console.log(error);
    });
};
var showProductsData = () => {
  $(".productDetailContainer").html("");
  for (var i = 0; i < productDataList.length; i++) {
    var pTemplate = productDataTemplate(productDataList[i]);
    $(".productDetailContainer").append(pTemplate);
  }
};

var getproductTemplate = () => {
  axios({ url: "templates/singlepageData.htm", method: "GET" })
    .then((response) => {
      console.log(response);
      productDataTemplate = Handlebars.compile(response.data);
    })
    .catch(() => {});
};
var addProduct = (productID) => {
  alert(productID);
};
var viewProduct = (productID) => {
  alert(productID);
};
getproductTemplate();

var getcategoryProduct = (categoryType) => {
  //alert(categoryType);
  getProductDetail(categoryType);
};
