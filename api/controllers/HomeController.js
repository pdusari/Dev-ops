module.exports = {
    view: function(req, res) {
       ContentService.getHomePageData(function(err, data) {
         ContentService.getIndustriesData(function(err, Indata) {
         res.view('homepage', {
                               content: data,
                               industries:Indata
                           });
       });
       });
    }
}
