var gutil        = require('gulp-util');
var through      = require('through2');
var hypher       = require('hypher');
var eachTextNode = require('./src/eachTextNode');

// Consts
const PLUGIN_NAME = 'gulp-hypher';

function gulpHypher(hyphenation_pattern) {
  if (!hyphenation_pattern) {
    throw new gutil.PluginError(PLUGIN_NAME, 'Missing hyphenation pattern!');
  }
  var h = new hypher(hyphenation_pattern);
  var hyphenateText = function(text) {
    // split the text in html entity and not entity
    return text.split(/(!?&[a-zA-Z]*;)/).map((textPart) => {
      // immediately return html entities and hyphenate everything else
      return textPart.match(/&[a-zA-Z]*;/)
        ? textPart
        : h.hyphenateText(textPart);
    }).join('');
  };

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    try {
      file.contents = new Buffer(eachTextNode(file.contents.toString(), hyphenateText));
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
    }

    cb();
  });
};

module.exports = gulpHypher;
