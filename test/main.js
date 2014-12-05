var wc = require('../');
var should = require('should');
var path = require('path');
var assert = require('stream-assert');
var gulp = require('gulp');
var through = require('through2');

require('mocha');

var fixtures = function(glob) { return path.join(__dirname, 'fixtures', glob); };

describe('gulp-word-count', function() {
  describe('wordcount()', function() {
    it('should count words in one file', function(done) {
        gulp.src(fixtures('*'))
          .pipe(wc({ file: 'test_name.log'}))
          .on('error', function(e) {
            console.log(e);
          })
          .pipe(assert.first(function(d) { d.contents.toString().should.eql('416'); }))
          .pipe(assert.end(done));
    });
    it('should store wordcount in a new file', function(done) {
        gulp.src(fixtures('*'))
          .pipe(wc({ file: 'test_name.log'}))
          .on('error', function(e) {
            console.log(e);
          })
          .pipe(assert.first(function(d) { d.relative.should.eql('test_name.log'); }))
          .pipe(assert.end(done));
    });
    it('should use NaNo name for NaNo mode', function(done) {
      var today = new Date();
      var datetime = [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('_');
      gulp.src(fixtures('*'))
        .pipe(wc({ nanoMode: true }))
        .on('error', function(e) {
          console.log(e);
        })
        .pipe(assert.first(function(d) { d.relative.should.eql('nano-' + datetime + '.log'); }))
        .pipe(assert.end(done));
    });
    it('should use CampNaNo name for CampNaNo mode', function(done) {
      var today = new Date();
      var datetime = [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('_');
      gulp.src(fixtures('*'))
        .pipe(wc({ campNano: true }))
        .on('error', function(e) {
          console.log(e);
        })
        .pipe(assert.first(function(d) { d.relative.should.eql('camp-' + datetime + '.log'); }))
        .pipe(assert.end(done));
    });
    it('should give a success message ', function(done) {
      var today = new Date();
      var datetime = [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('_');
      gulp.src(fixtures('*'))
        .pipe(wc({ campNano: true, goal: 50 }))
        .on('error', function(e) {
          console.log(e);
        })
        .pipe(assert.first(function(d) { d.relative.should.eql('camp-' + datetime + '.log'); }))
        .pipe(assert.end(done));
    });
  });

});
