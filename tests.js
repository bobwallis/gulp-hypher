/* global describe, it */

'use strict';

var assert = require('assert');
var gutil  = require('gulp-util');
var expect = require('chai').expect;
var gulpHypher = require('./');
var hyphenation_pattern = require('hyphenation.en-gb');

describe('gulp-hypher', function() {
	it('should ', function (cb) {
		var stream = gulpHypher(hyphenation_pattern);
		var html = '<p>Council leaders have called on the government to provide more resources to help them house extra refugees that the UK is planning to accept.</p>'
			+ '<p>... and then I just test if it also works with HTML entities</p>'
			+ '<p>dagger -> &dagger; <br>kappa -> &kappa; <br>omicron -> &omicron; </p>';
		var result = '<p>Coun\u00ADcil lead\u00ADers have called on the gov\u00ADern\u00ADment to provide more re\u00ADsources to help them house ex\u00ADtra refugees that the UK is plan\u00ADning to ac\u00ADcept.</p>'
			+ '<p>... and then I just test if it also works with HTML en\u00ADtit\u00ADies</p>'
			+ '<p>dag\u00ADger -> &dagger; <br>kappa -> &kappa; <br>omic\u00ADron -> &omicron; </p>';
		var file = new gutil.File({
			base: __dirname,
			path: __dirname + '/test.html',
			contents: new Buffer(html)
		});

		stream.on('data', function (file) {
			expect(file.contents.toString()).to.equal(result);
		});

		stream.on('end', cb);

		stream.write(file);

		stream.end();
	});
});
