var gulp = require("gulp");
var $ = require("gulp-load-plugins"); //加载插件

var less = require("gulp-less"); //gulp less插件
var cleancss = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var fileinclude = require('gulp-file-include');
var bs = require("browser-sync").create();



gulp.task("test", function() {
    console.log('gulp成功运行');
})

gulp.task("less", function() {
    gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest("src/css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(bs.reload({ stream: true }));
})

gulp.task("html", function() {
    gulp.src(["src/**/*.html", "!src/temp/*"])
        .pipe(fileinclude({
            basepath: "src/temp"
        }))
        .pipe(htmlmin({
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest("dist"));
})

gulp.task("images", function() {
    gulp.src("src/images/*.{png,jpg,gif}")
        .pipe(gulp.dest("dist/images"));
})

gulp.task("serve", function() {
    bs.init({
        server: {
            baseDir: "./dist"
        },
        startPath: "dome.html",
        //更改默认端口weinre
        ui: {
            port: 8081,
            weinre: {
                port: 9090
            }
        }
    })
})

gulp.task("refresh", function() {
    bs.reload(); // 释放你的f5
})

gulp.task("watch", function() {

    gulp.watch("src/**/*.html", ["html", "refresh"]);

    gulp.watch("src/less/*.less", ["less"]);

})

// 默认任务，gulp直接确定的时候执行
gulp.task("default", ["serve", "html", "less"], function() {
    gulp.start("watch");
    console.log('监听运行');
})