    var markdown = require( "markdown" ).markdown;
module.exports = {
  index:(req,res)=>{
    console.log("handled twice!!!");
    var id = req.param('ID');
    console.log("id",id);
  ContentService.getProjectdetails(id,function(err, data) {
    if(data.fields.tools){
      var tools=markdown.toHTML(data.fields.tools);
      data.fields.tools=tools;
    }
    if(data.fields.bestpractice){
      var bestpractice=markdown.toHTML(data.fields.bestpractice);
      data.fields.bestpractice=bestpractice;
    }
    if(data.fields.ideas){
      var ideas=markdown.toHTML(data.fields.ideas);
      data.fields.ideas=ideas;
    }
    if(data.fields.reviews){
      var reviews=markdown.toHTML(data.fields.reviews);
      data.fields.reviews=reviews;
    }
    if(data.fields.data){
      var fieldsdata=markdown.toHTML(data.fields.data);
      data.fields.data=fieldsdata;
    }

  // res.json(data);
    res.view('details', {
      content: data,
      LOGO: '../images/navlogo.png'
    });

  });

}
}
