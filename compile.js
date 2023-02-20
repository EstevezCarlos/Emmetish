const stylus	=	require('stylus')
const fs		=	require('node:fs')
const path		=	require('path')



fs.readdir('source', (err,files) => {

	if(err) console.error(err)
	files.forEach(compile)

})



function compile(file) {

	const extension = path.extname(file)

	if ( extension != '.styl' && extension != '.stylus') return 
	
	const filename = path.basename(file,extension)

	const str = fs.readFileSync(`source/${filename}.stylus`).toString()

	const error = (err) => {
		if (err)	console.error(err);
	}

	const render = (err, css) => {
		if (err)	console.error(err)
		else		fs.writeFileSync(`dist/${filename}.css`,css)
	}

	stylus(str)
		.set('filename', `dist/${filename}.css`)
		.render(render)

}


// stylus.render(str, { filename: 'nesting.css' }, function(err, css){
// 	if (err) throw err;
// 	console.log(css);
// });
