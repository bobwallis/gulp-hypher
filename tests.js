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
		var html = '<p>Council leaders have called on the government to provide more resources to help them house extra refugees that the UK is planning to accept.</p>';
		var result = '<p>Coun\u00ADcil lead\u00ADers have called on the gov\u00ADern\u00ADment to provide more re\u00ADsources to help them house ex\u00ADtra refugees that the UK is plan\u00ADning to ac\u00ADcept.</p>';
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