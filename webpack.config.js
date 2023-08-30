////////// Import Configurations
//// JS Configuration
import ("./configs/js.webpack.config.js")
//// Babel-loader Configuration
import ("./configs/babel.config.js")

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
	{
		devServer: {
			static: {
				directory: path.join(__dirname, 'webpack/public'),
			},
			compress: true,
			port: 9000,
		},
	},
/*--------------*/
	{
		output: {
			path: path.resolve(__dirname, './webpack/public/components/js'),
			filename: '[name].js'
		},
	},
/*--------------*/
{
	entry: "./src/index.ts",
	devtool: "inline-source-map",
	module: {
	rules: [
		{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		},
	],
},
resolve: {
	extensions: ['.tsx', '.ts', '.js'],
},
output: {
	filename: "ts.[name].js",
		path: path.resolve(__dirname, "./webpack/public/components/js"),
	},
},
/*--------------*/
	{
		plugins: [new MiniCssExtractPlugin({
			runtime: true,
		})],
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								publicPath: "./webpack/public",
							},
						},
					],
				},
			],
		},
	},
/*--------------*/
	{
	entry: './src/index.jsx',
		output: {
			filename: "../webpack/public/components/js/main/main.js",
			chunkFilename: "../webpack/public/components/js/chunk/chunk.js",
			clean: true,
		}
	},
/*--------------*/
{
	entry: {
		index: "./src/index.js",
		M: './src/module.js', // "Another-Module.js ( M = Module) //
		print: "./src/print.js",
	},
	  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom Webpack Start-up Deployment Template',
    }),
  ],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "./webpack/public"),
   },
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
},
/*--------------*/
	{
		mode: 'production',
		"watch": true,
},
/*--------------*/
	{
	output: {
		filename: "[name].css-script.js",
		path: path.resolve(__dirname, './webpack/public/components/js'),
	},
	entry: './src/index.js',
	mode: 'production',
},
/*--------------*/
{
	output: {
		filename: `style.[name].css`,
			path: path.resolve(__dirname, `./webpack/public/components/css`),
	},
	name: 'style',
	entry: './src/style.css',
	mode: 'production',
},
/*--------------*/
	{
  	module: {
    	rules: [
    	  {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
           options: {
             importLoaders: 1,
           }
          },
          {
            loader: 'postcss-loader'
          },
        ],
      },
      		{
        		test: /\.jsx?$/,
        		use: ['babel-loader', 'astroturf/loader'],
      		},
		  ],
	  	},
	},
];
/*------------------------------------------------------------------------------------------------*/
