const gulp = require('gulp');
const fs = require('fs');

const icons = () => {
	const dir = './dist/icons';
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	return gulp.src('icons/*.svg').pipe(gulp.dest(dir));
};

exports.build = gulp.series(icons);
