"use strict";

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  plumber = require("gulp-plumber"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  server = require("browser-sync"),
  gulpGlob = require("gulp-sass-glob"), // to import whole directories of scss
  path = require("path"),
  mqpacker = require("css-mqpacker"),
  minify = require("gulp-csso"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  runSequence = require("run-sequence");

gulp.task("style", function () {
  gulp.src("sass/style.scss")
      .pipe(plumber())
      .pipe(gulpGlob())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({
          browsers: [
            "last 2 version"
          ]
        }),
        mqpacker({
          sort: true
        })
      ]))
      .pipe(gulp.dest("build/css"))
      .pipe(minify())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("build/css"))
      .pipe(server.reload({stream: true}));
});

gulp.task("serve", function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", function (file) {

    // copy html file to build folder
    gulp.src(file.path)
        .pipe(gulp.dest("build"))
        .pipe(server.reload({stream: true}));
  });
});

gulp.task("copy", function () {
  return gulp.src([
               "fonts/**/*.{woff,woff2}",
               "img/**",
               "js/**",
               "*.html"
             ], {
               base: "."
             })
             .pipe(gulp.dest("build"));
});


gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", function (fn) {
  runSequence(
    "clean",
    "copy",
    "style",
    fn
  );
});

