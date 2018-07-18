module.exports = {
  view: function(req, res) {
    ContentService.getdevOpsCycleStagesData(function(err, data) {
      ContentService.getReviewsData(function(err, Reviews) {
          ContentService.getPillarsData(function(err, Indata) {
        ContentService.getToolsData(function(err, tooldata) {
          var SPACE_ID = "qwppyk7r0xj8";
          ContentService.getEntry("qwppyk7r0xj8", "1HCtAaqTwwkwua0quk6Oai", function(err, asset) {
            var resultset = JsonService.mergeArrays(data.items, data.includes.Asset);
            var pillarsresultset = JsonService.mergeArrays(Indata.items, Indata.includes.Asset);
            var toolsresultset = JsonService.mergeArrays(tooldata.items, tooldata.includes.Asset);
            var reviewsresultset = JsonService.mergeReviewArrays(Reviews.items, Reviews.includes.Asset);
            // console.log("reviewsresultset",reviewsresultset);
            res.view('homepage', {
              devops: resultset,
              pillars: pillarsresultset,
              asset: asset,
              review: reviewsresultset,
              tools:toolsresultset,
              LOGO: 'images/navlogo.png'
            });
        //  res.json(toolsresultset);
          });
        });
        });
      });
    });
  }
}
