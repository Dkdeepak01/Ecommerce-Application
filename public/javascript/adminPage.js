var productAdd=()=>{
    var productDetail={};   
    productDetail.id=Math.round(Math.random()*1000);
    productDetail.title=$("#title").val();
    productDetail.price=$("#price").val();
    productDetail.category=$("#category").val();
    productDetail.description=$("#description").val();
    productDetail.image=$("#image").val();
     
    console.log(productDetail);
    sendtoServer(productDetail);
   
}
var sendtoServer=(pData)=>{

    axios.post("/add/new/products",pData).then((response)=>{
      console.log(response);
      if(response.data.msg =='Success'){
        $("#statusmsg").show();
          }
    })
}