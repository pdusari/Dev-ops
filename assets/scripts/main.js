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

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function validateForm() {
    var x = document.forms["login"]["uname"].value;
    var atpos = x.indexOf("@deloitte");
    var dotpos = x.lastIndexOf(".");

    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid deloitte mail address");
        return false;
    }else{
        makeid();
    }

}

var loginId;
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
loginId = text;

var date = new Date();
date.setTime(date.getTime()+(24*60*60*1000));
var expires = "; expires="+date.toGMTString();
//var string = "token="+document.forms["login"]["uname"].value+text+expires+"; path=/";
document.cookie = "token="+document.forms["login"]["uname"].value+text+expires;
//console.log(string);
//console.log("this is called"+ text);
ShoWHideDiv();
  return text;
}

function ShoWHideDiv() {
    var element = document.getElementById("emailDiv");
    element.classList.add("Hidden");

    var element = document.getElementById("tokenDiv");
    element.classList.remove("Hidden");
}
ShoWHideDiv()
