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

// 

// var gulp = require("gulp");
// var less = require("gulp-less");
// var rename = require("gulp-rename");
// var cleancss = require("gulp-clean-css");
// var autoprefixer = require("gulp-autoprefixer");
// var notify = require('gulp-notify');
// var fileinclude = require('gulp-file-include');
// var browserSync = require("browser-sync").create();
// // var cleancss = require("gulp-uglify");

// // 编译less(文件=>处理=>输出)
// gulp.task("lessc", function(){
//     gulp.src("src/less/*.less") //获取less文件
//         .pipe( less() )          //使用gulp-less插件处理
//         .pipe( autoprefixer({    //css前缀
//             browsers: ["last 2 versions"]
//         }) )
//         .pipe( gulp.dest("src/css") )   //处理完成输出到x目录中
//         .pipe( cleancss() )         // 压缩css
//         .pipe( rename({suffix: ".min"}) )  // 改名为.min.css
//         .pipe( gulp.dest("src/css") )  //输出
//         .pipe( notify({ message: '样式编译完成' }) )
//         .pipe( browserSync.reload({stream: true}) );
// })

// // 开启服务器
// gulp.task("serve", function () {
//     browserSync.init({
//         server: {
//             baseDir: "./src"
//         },
//         startPath: "html/index.html"
//     })
// })

// // 处理html
// gulp.task("html", function () {
//     gulp.src("src/index.html")
//         .pipe( fileinclude({
//             basepath: "src/temp"
//         }) )
//         .pipe( gulp.dest("src/html") );
// })

// gulp.task("refresh", function () {
//     browserSync.reload();
// })

// // 监听
// gulp.task("watch", function(){
//     // 监听less文件，进行编译
//     gulp.watch("src/less/*.less", ["lessc"]);

//     // 监听html文件，刷新浏览器
//     gulp.watch(["src/*.html"], ["html", "refresh"])
// })

// // 默认任务
// gulp.task("default", ["html", "serve", "watch"], function(){
//     gulp.start("lessc");
// })

// 包含各种各样的功能插件
// gulp-less 处理less编译
// gulp-concat 合并文件 a.css b.css all.css
// gulp-clean-css 压缩css
// gulp-uglify 压缩js
// ...

// 确保电脑上安装过node
// 1、全局安装 使用gulp全局命令
// npm install -g gulp
// 2、本地安装 具体到一个项目里
// npm install --save-dev gulp
// 3、在当前项目的根目录，创建gulpfile.js文件
// 文件名不能变，gulp名字会自动寻找对应文件
// 4、在gulpfile.js文件里
// 使用gulp提供的api创建对应任务
// 例如：编译，压缩，图片处理，代码检查，启动服务器...
// 5、在当前项目根目录启动命令行
// 输入gulp，执行任务，后续同样...

// var gulp = require("gulp");
// var less = require("gulp-less");
// var notify = require("gulp-notify");
// var bs = require("browser-sync").create();

// gulp.task("lessc", function(){
//     gulp.src("./src/less/*.less")
//         .pipe( less() )
//         .pipe( gulp.dest("./src/css") )
//         .pipe( notify({message: "编译完成"}) )
//         .pipe( bs.reload({stream: true}) );
// })

// gulp.task("server", function(){
//     bs.init({
//         server: {
//             baseDir: "./", //服务主目录
//         },
//         port: 8888,
//         startPath: "src/index.html" //服务启动主文件
//     })
// })

// gulp.task("watch", function(){
//     gulp.watch("./src/less/*.less", ["lessc"]);
//     // gulp.watch("./src/css/*.css", ["concat"]);
//     gulp.watch("./src/*.html", bs.reload);
// })

// gulp.task("default", ["server", "watch"], function(){
//     console.log("服务已启动...")
// })