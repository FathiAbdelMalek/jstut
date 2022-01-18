const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const connect = require("gulp-connect");
const maps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const zip = require("gulp-zip");

const css = () => {
  return gulp
    .src("src/scss/main.scss")
    .pipe(maps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(maps.write("."))
    .pipe(gulp.dest("public/assets/css"))
    .pipe(connect.reload());
};

const js = () => {
  return gulp
    .src("src/js/main.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("public/assets/js"))
    .pipe(connect.reload());
};

const watch = () => {
  require("./server");
  gulp.watch("src/scss", css);
  gulp.watch("src/js", js);
};

const compress = () => {
  return gulp.src("public/**/*.*").pipe(zip("dist.zip")).pipe(gulp.dest("."));
};

const build = gulp.series(gulp.parallel(css, js), compress);

exports.css = css;
exports.js = js;
exports.watch = watch;
exports.compress = compress;
exports.build = build;
exports.default = build;
