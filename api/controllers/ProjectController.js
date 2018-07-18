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
    //  console.log("data",resultset);
      res.view('project', {
        content: resultset,
        LOGO: '../images/navlogo.png'
      });

      //  res.json(resultset);
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

  }
}
