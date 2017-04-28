module.exports = {
	entry: "./entry",
	output: {
		path: __dirname + "/client/js",
		filename: "bundle.js"
	},
	
	module: {
		loaders: [
			{ test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'es2015']
				}
			}
		]
	}
}