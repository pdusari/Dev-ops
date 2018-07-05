module.exports = {
    view: (req, res) => {

      var spaceid = req.param('industryID');
        ContentService.getProjectData(spaceid,function(err, data) {

           var resultset=JsonService.mergeProjectsArrays(data.items,data.includes.Asset);
          // console.log("data",resultset);
          res.view('project', {
                                content:resultset
                            });

          //res.json(resultset);
      });
    }
}
