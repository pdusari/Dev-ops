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
    $('.showSingle').css('opacity', '0.5');
    $('.showSingle:eq(0)').css('opacity', '1');
    $('.showSingle').click(function() {
      $('.showSingle').css('opacity', '0.5');
      $(this).css('opacity', '1');
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
    var x = document.getElementById("uname").value;
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
    $.cookie('isloggedin', text,{ expires: 1, path: '/' });
    var email={"emailto":document.getElementById("uname").value,"message":"Dear,<br><br> Please find the Token for Dev-ops portal:"+text+"<br><br><br>Regards,<br>Support Team"}
    $.ajax({
         type: "POST",
         url: "/email",
         data: email,
         dataType: "text",
         success: function(resultData){
             alert("Please fill the Token which you will receive on Email");
         }
    });

//var string = "token="+document.forms["login"]["uname"].value+text+expires+"; path=/";
//document.cookie = "token="+ document.getElementById("uname").value+text+expires;
//console.log(string);
//console.log("this is called"+ text);
ShoWHideDiv();
  return text;
}
function validateToken(){
  var Token=document.getElementById("upsw").value
  var Cookiestored=$.cookie('isloggedin')
  if(Cookiestored==Token){
    $('#id01').modal('hide');
    $('.ml-auto li:last').hide()
  }else{
    alert("Invalid Cookie")
  }
}
function validateTokenExits(){
var Cookiestored=$.cookie('isloggedin')
if(Cookiestored){
  $('#id01').modal('hide');
  $('.ml-auto li:last').hide()
}else{
  $('#id01').modal('show');
  $('.ml-auto li:last').show()
}
}
validateTokenExits()
function ShoWHideDiv() {
    var element = document.getElementById("emailDiv");
    element.classList.add("Hidden");

    var element = document.getElementById("tokenDiv");
    element.classList.remove("Hidden");
}
