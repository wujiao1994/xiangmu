let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let cssmin = require("gulp-clean-css");
let uglify = require("gulp-uglify");

//gulp.task("copy-all",async ()=>{
//	gulp.src("./src/**/*").pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\yihaodian"));
//});

gulp.task("default",async()=>{
	gulp.watch("./src/*.html",async()=>{
		gulp.src("./src/*.html")
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeEmptyAttributes:true,
			removeComments:true,
			minifyJS:true,
			minifyCSS:true
		}))
		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\yihaodian"));
	})
	gulp.watch("./src/css/*.css",async()=>{
		gulp.src("./src/css/*.css")
		.pipe(cssmin())
		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\yihaodian\\css"));
	})
	gulp.watch("./src/js/*.js",async()=>{
		gulp.src("./src/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\yihaodian\\js"));
	})
	// js
	gulp.watch("./src/js/*.js", async ()=>{
	        gulp.src("./src/js/*.js")
	         .pipe(uglify())
	        .pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\yihaodian\\src\\js"))
	})
	gulp.watch("./src/js/*.js",async ()=>{
        gulp.src(["./src/js/index.js","./src/js/goodslist.js","./src/js/show.js"])
        .pipe(concat("tools.js"))
        .pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\yihaodian\\js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename("tools.min.js"))
        .pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\yihaodian\\js"));
    })

})
