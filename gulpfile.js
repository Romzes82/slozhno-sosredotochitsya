const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 

function html() {
    return gulp.src('src/**/*.html')
          .pipe(plumber())
                  .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));
  }
  
  function css() {
    // return gulp.src('src/blocks/**/*.css')
    return gulp.src('src/**/*.css')
          .pipe(plumber())
          .pipe(concat('bundle.css'))
                  .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));        
  }
  
  function fonts() {
    return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
              .pipe(gulp.dest('dist/fonts'))
              .pipe(browserSync.reload({stream: true}));                 
  }
  
  function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
              .pipe(gulp.dest('dist/images'))
              .pipe(browserSync.reload({stream: true}));                 
  }
  
  function scripts() {
    return gulp.src('src/scripts/**/*.js')
    //   .pipe(jsMinify({
    //     ext: {
    //       min: '.js'
    //     },
    //     noSource: true
    //   }))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(browserSync.reload({stream: true}));         
  }

  function clean() {
    return del('dist');
  }
  
  function watchFiles() {
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/**/*.css'], css);
    gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
    gulp.watch(['src/fonts/**/*.{ttf,woff,woff2}'], fonts);
    gulp.watch(['src/scripts/**/*.{js}'], scripts);
  } 

  function serve() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
  }   

  const build = gulp.series(clean, gulp.parallel(html, css, fonts, images, scripts)); 
  const watchapp = gulp.parallel(build, watchFiles, serve);

  exports.html = html; 
  exports.css = css; 
  exports.fonts = fonts; 
  exports.images = images; 
  exports.scripts = scripts;
  exports.clean = clean; 

  exports.build = build;
  exports.watchapp = watchapp;
  exports.default = watchapp;