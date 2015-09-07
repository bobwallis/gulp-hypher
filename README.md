# gulp-hypher

> Preprocess HTML with [Hypher](https://github.com/bramstein/hypher)

*Issues with the output should be reported on the Hypher [issue tracker](https://github.com/bramstein/hypher/issues).*


## Install

```
$ npm install --save-dev gulp-hypher
$ npm install --save-dev hyphenation.en-us
```

Replacing en-us with the relevant hyphenation pattern for your language.

## Usage

```js
var gulp = require('gulp');
var hypher = require('gulp-hypher');
var hypher_en-us = require('hyphenation.en-us')

gulp.task('default', function () {
	return gulp.src('index.html')
		.pipe(hypher(hypher_en-us))
		.pipe(gulp.dest('dist'));
});
```

This will add soft hyphens to all text nodes in the HTML passed.