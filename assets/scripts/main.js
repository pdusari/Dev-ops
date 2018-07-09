$(document).ready(function () {
    $('ul.tabs').tabs();
    $(".project-details-content .indicator").remove();

    var id = $.urlParam('id');
    if($('#industryId')){
      $('#industryId').val(id);
    }

});
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}
