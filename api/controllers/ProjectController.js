module.exports = {
  view: (req, res) => {

    var spaceid = req.param('industryID');
    ContentService.getProjectData(spaceid, function(err, data) {

      if (data.items.length == 0) {
        var resultset = null;
      } else {
        var resultset = JsonService.mergeProjectsArrays(data.items, data.includes.Asset);
      }
      //var resultset=JsonService.mergeProjectsArrays(data.items,data.includes.Asset);
     //console.log("data",data.includes.Entry[0].fields);
      res.view('project', {
        content: resultset,
        industry:data.includes.Entry[0].fields,
        LOGO: '../images/navlogo.png'
      });

      // res.json(resultset);
    });
  },
  search:(req,res)=>{
      var spaceid = req.param('industryId');
      var search = req.param('search');
    ContentService.getSearchData(search, spaceid,function(err, data) {
      if (data.items.length == 0) {
        var resultset = null;
      } else {
        var resultset = JsonService.mergeProjectsArrays(data.items, data.includes.Asset);
      }
      res.view('project', {
        content: resultset,
        LOGO: '../images/navlogo.png'
      });
    });

  },
  details:(req,res)=>{
    var markdown = require( "markdown" ).markdown;
    var id = req.param('ID');
  ContentService.getProjectdetailsData(id,function(err, data) {
    console.log("one time");
    if(data.fields){
      data.fields.tools=markdown.toHTML( data.fields.tools);
       data.fields.bestpractice=markdown.toHTML( data.fields.bestpractice);
       data.fields.ideas=markdown.toHTML( data.fields.ideas);
       data.fields.data=markdown.toHTML( data.fields.data);
       data.fields.reviews=markdown.toHTML( data.fields.reviews);
    }

    //res.json(data);
    res.view('projectdetails', {
      content: data,
      LOGO: '../images/navlogo.png'
    });
  });

}
}
