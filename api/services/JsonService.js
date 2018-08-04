module.exports = {
  mergeArrays(array1, array2) {
    for (var i = 0; i < array1.length; i++) {
      var arra = [];
      var arr = _.find(array2, function(o) {
        return o.sys.id == array1[i].fields.icon.sys.id;
      });
      array1[i].fields.icon.asset = arr;
    }
    return array1;
  },
  mergeToolsArrays(array1, array2) {
    for (var i = 0; i < array1.length; i++) {
      var arra = [];
      var arr = _.find(array2, function(o) {
        return o.sys.id == array1[i].fields.icon.sys.id;
      });


      if (array1[i].fields.toolused) {
        var toolsused=array1[i].fields.toolused;
        console.log("array1[i].fields.toolused", toolsused.length);
        arr2 = [];
        for (var i = 0; i < toolsused.length; i++) {
          var usedarray = _.find(array2, function(o) {
            return o.sys.id == toolsused[i].sys.id;
          });
          arr2.push(usedarray);
        }
        array1[i].fields.icon.toolsused = arr2;
      }


      array1[i].fields.icon.asset = arr;

    }
    return array1;
  },
  mergeReviewArrays(array1, array2) {
    for (var i = 0; i < array1.length; i++) {
      var arra = [];
      var arr = _.find(array2, function(o) {
        return o.sys.space.sys.id == array1[i].sys.space.sys.id;
      });
      array1[i].fields.asset = arr;
    }
    return array1;
  },
  mergeIndustryArrays(array1, array2) {
    for (var i = 0; i < array1.length; i++) {
      var arra = [];
      var arr = _.find(array2, function(o) {
        //console.log("Merged Array",array1[i].fields.industryImage.sys.id);
        return o.sys.id == array1[i].fields.industryImage.sys.id;

      });

      array1[i].fields.industryImage.asset = arr;
    }
    return array1;
  },
  mergeProjectsArrays(array1, array2) {

    for (var i = 0; i < array1.length; i++) {
      var arr = _.find(array2, function(o) {
        //console.log("Merged Array",array1[i].fields.industryImage.sys.id);
        return o.sys.id == array1[i].fields.image.sys.id;

      });
      array1[i].fields.asset = arr;
    }
    // var arr= _.find(array2, function(o) {
    //   //console.log("Merged Array",array1[i].fields.industryImage.sys.id);
    //     return o.space.sys.id == array1[i].sys.space.sys.id;
    //
    // });

    return array1;
  }
};
