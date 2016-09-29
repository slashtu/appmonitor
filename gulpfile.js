var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths = {
	view :   'public/views/*.html',
	images : 'public/images/**',
	libs :   'public/lib/**',
  css:     'public/css/*.css',
  files:   'public/files/**',
  destFiles: 'dist/public/assets/files',
  destDir: 'dist',
  destCSS: 'dist/public/assets/css',
  destImages: 'dist/public/assets/images',
	destLibs : 'dist/public/assets/lib'
};

gulp.task('minify-image', function () {
    return gulp.src(paths.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.destImages));
});

gulp.task( 'static-files-handler' , function(){

	var _libs = gulp.src( paths.libs )
				.pipe(gulp.dest(paths.destLibs))
  var _view = gulp.src( paths.view )                  
        .pipe(gulp.dest(paths.destDir))

  var _files = gulp.src( paths.files )
        .pipe(gulp.dest(paths.destFiles))
});

gulp.task('minify-css', function() {
    gulp.src( paths.css )
        // .pipe(minifyCSS(
        //    {
        //        noAdvanced: false,
        //        keepBreaks:true,
        //        cache: true
        //    }))

        .pipe(gulp.dest( paths.destCSS ))
});

gulp.task('default', ['minify-css', 'minify-image', 'static-files-handler'] );
gulp.task('watch', function() {
    gulp.watch( 'public/**/*', ['default'] );
});

gulp.task('development', ['default', 'watch'] );
gulp.task('production', ['default']);

