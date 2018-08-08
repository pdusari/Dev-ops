$(document).ready(function() {
  // $('ul.tabs').tabs();
  // $(".project-details-content .indicator").remove();
  //
  // var id = $.urlParam('id');
  // if($('#industryId')){
  //   $('#industryId').val(id);
  // }

  $('#sendEmail').click(function() {
    var data = $('form[name="contactUS"').serialize();
    $.ajax({
        type: "POST",
        url: '/email',
        data: data
      })
      .done(function(success) {
        alert("done");
      })


  });

  function projectdetails() {
    $('.div-one').show();
    $('.showSingle').click(function() {

      $('.targetDiv').hide();
      $('#div' + $(this).attr('target')).show();

    });
  }
  if(window.location.href.indexOf("projectdetails") > -1) {
         projectdetails();
      }

});

$.urlParam = function(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
}


$('#Searchprojects').on('click', function(e) {
  var query = $.trim($('.search-projects').val()).toLowerCase();
  $('div.logo-grid').each(function() {
    var $this = $(this);
    if ($this.find('p.logo-text').text().toLowerCase().indexOf(query) === -1)
      $this.closest('div.logo-grid').hide();
    else $this.closest('div.logo-grid').show();
  });
});
