module.exports = {
  view: function (req, res) {
    ContentService.getdevOpsCycleStagesData(function (err, data) {
      ContentService.getPillarsData(function (err, Indata) {
        var SPACE_ID="qwppyk7r0xj8";
        ContentService.getEntry("qwppyk7r0xj8", "1HCtAaqTwwkwua0quk6Oai", function (err, asset) {
          var resultset=JsonService.mergeArrays(data.items,data.includes.Asset);
          var pillarsresultset=JsonService.mergeArrays(Indata.items,Indata.includes.Asset);
          res.view('homepage', {
            devops: resultset,
            pillars: pillarsresultset,
            asset: asset
          });
        //  res.json(resultset);
        });
      });
    });
  }
}
