// -----------------------------------------------------
// Requires
// -----------------------------------------------------
var del = require('del');
var os = require('os');
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var jsonMinify = require('gulp-jsonminify');
var less = require('gulp-less');
var releaseTasks = require('gulp-release-tasks');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webServer = require('gulp-webserver');
var seq = require('run-sequence');

// -----------------------------------------------------
// Globals
// -----------------------------------------------------
var GLOBS 				= {};
GLOBS.output 			= 'dist';
GLOBS.fonts 			= 'src/fonts/*';
GLOBS.images			= ['src/img/*', 'src/img/**/*'];
GLOBS.js          = 'src/js/**/*';
GLOBS.languages		= 'src/languages/*';
GLOBS.libs 				= 'src/libs/**/*';
GLOBS.less 				= 'src/less/avanti.less';
GLOBS.html 				= 'src/index.html';
GLOBS.views 			= 'src/views/**/*';

// -------------------------------------------------------
// Errors
// -------------------------------------------------------
gulp.on('error', function(e) {
  throw(e);
});

// --------------------------------------------------------
// Clean dest folder
// --------------------------------------------------------
gulp.task('clean', function(done) {
	del('dist/**').then(paths => {
		done();
	});
});

// --------------------------------------------------------
// Copy sequence
// --------------------------------------------------------
gulp.task('copy:fonts', function() {
	return gulp.src(GLOBS.fonts)
	.pipe(gulp.dest(path.join(GLOBS.output, 'fonts')));
});

gulp.task('copy:images', function() {
	return gulp.src(GLOBS.images)
	.pipe(gulp.dest(path.join(GLOBS.output, 'img')));
});

gulp.task('copy:html', function() {
	return gulp.src(GLOBS.html)
	.pipe(gulp.dest(GLOBS.output));
});

gulp.task('copy:views', function() {
	return gulp.src(GLOBS.views)
	.pipe(gulp.dest(path.join(GLOBS.output, 'views')));
});

gulp.task('copy:libs', function() {
	return gulp.src(GLOBS.libs)
	.pipe(gulp.dest(path.join(GLOBS.output, 'libs')));
});

gulp.task('copy', function(done) {
	seq('copy:fonts', 'copy:images', 'copy:html', 'copy:views', 'copy:libs', done);
});

// --------------------------------------------------------
// Less styles
// --------------------------------------------------------
var CSS_TEMP_DIR = path.join(os.tmpdir(), 'avanti', 'css');

gulp.task('css:build', function() {
	return gulp.src(GLOBS.less)
		.pipe(less())
		.pipe(gulp.dest(CSS_TEMP_DIR));
});

gulp.task('css:minify', function() {
	return gulp.src(path.join(CSS_TEMP_DIR, 'avanti.css'))
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.join('dist', 'css')));
});

gulp.task('css', function(done) {
	seq('css:build', 'css:minify', done);
});

// --------------------------------------------------------
// Minify and copy js
// --------------------------------------------------------
gulp.task('languages', function() {
		return gulp.src(GLOBS.languages)
			.pipe(jsonMinify())
			.pipe(gulp.dest(path.join('dist', 'languages')));
});

// --------------------------------------------------------
// Minify and copy js
// --------------------------------------------------------
gulp.task('js', function() {
	return gulp.src(GLOBS.js)
		.pipe(concat('avanti.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.join(GLOBS.output, 'js')));
});

// --------------------------------------------------------
// Serve app
// --------------------------------------------------------
gulp.task('serve', function() {
	gulp.src('dist')
	.pipe(webServer({
		livereload: false,
		open: true
	}));
});

// --------------------------------------------------------
// Watchers
// --------------------------------------------------------
gulp.task('watch', function() {
	gulp.watch('src/**/*', ['build']);
});

// --------------------------------------------------------
// Sequences
// --------------------------------------------------------
gulp.task('build', function(done) {
	seq('clean', 'copy', 'css', 'languages', 'js', done);
});

gulp.task('default', function(done) {
	seq('build', 'serve', 'watch', done);
});

// --------------------------------------------------------
// Release
// --------------------------------------------------------
releaseTasks(gulp);
