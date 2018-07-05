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
