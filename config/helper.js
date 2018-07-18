var Handlebars = require('../node_modules/handlebars');

var hljs = require('highlight.js');
var markdown = require('helper-markdown');

function highlight(code, lang) {
  try {
    try {
      return hljs.highlight(lang, code).value;
    } catch (err) {
      if (!/Unknown language/i.test(err.message)) {
        throw err;
      }
      return hljs.highlightAuto(code).value;
    }
  } catch (err) {
    return code;
  }
}

Handlebars.registerHelper('markdown', require('helper-markdown'));

Handlebars.registerHelper('ifThird', function (index, options) {
   if(index == 2){
      return options.fn(this);
   } else {
      return options.inverse(this);
   }

});
Handlebars.registerHelper('ifThird', function (index, options) {
   if(index == 2){
      return options.fn(this);
   } else {
      return options.inverse(this);
   }

});
Handlebars.registerHelper('iffourth', function (index, options) {
   if(index == 3){
      return options.fn(this);
   } else {
      return options.inverse(this);
   }

});
Handlebars.registerHelper('iflast', function (index, options) {
   if(index == 7){
      return options.fn(this);
   } else {
      return options.inverse(this);
   }

});
