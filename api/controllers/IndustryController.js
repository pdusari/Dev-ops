module.exports = {
  view: (req, res) => {
    //res.render("industry");
    ContentService.getIndustriesData(function (err, data) {
      if(err){
        console.log("Error:",err);
      }
      array1=data.items;
      for(var i=0;i<array1.length;i++){
        if(!array1[i].fields.industryImage){
          array1[i].fields.industryImage={
            "sys":{
              "id":null
            }
          }
        }
      }
      
      var resultset=JsonService.mergeIndustryArrays(array1,data.includes.Asset);
      console.log("data items",resultset);
      res.view('industry', {
        industries: resultset
      });
     // res.json(resultset);
    });
  }
}
