var path = require('path');
var webpack = require('webpack');
var PathRewriterPlugin = require('webpack-path-rewriter')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("uat")
    }
});


var time = new Date().getTime();

var staticPath = 'bundle.' + time + '.js'

module.exports = {
  devtool: 'eval',
  entry: [
    './public/js/boot.jsx',
  ],

  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: staticPath
  },

  plugins: [
    new ExtractTextPlugin('./assets/css/app.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.NoErrorsPlugin(),
    new PathRewriterPlugin(),
    definePlugin
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: 'babel',
        exclude: /node_modules/
      },{
        test: /[.]jade$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '../[name].html',
          loader: 'jade-html?' + JSON.stringify({ pretty: true , staticPath: staticPath})
        })
      },{
        test: /\.json$/,
        loaders: ['json']
      },{
        test: /\.(css|scss|pcss)$/,
        loader: ExtractTextPlugin.extract("style-loader","css?-autoprefixer&-minimize&modules&importLoaders=1&localIdentName=[hash:base64:3]!postcss!sass")
      },{
        test: /\.png$/,
        loader: "url-loader?limit=819&name=assets/imgs/[hash].png"
      },{ 
        test: /\.jpg$/,
        loader: "file-loader"
      },{
        test: /\.svg$/,
        loader: 'babel!svg-react'
      }
    ]
  },

  postcss: [autoprefixer,cssnano({zindex: false})],

  resolve: {
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js', '.jsx', '.json', '.coffee'],
      
      alias:{
        app: path.join(__dirname + '/public/js'),
        svg: path.join(__dirname, 'public/images/svg'),
        store: path.join(__dirname, 'public/js/stores'),
        action: path.join(__dirname, 'public/js/actions'),
      }
  },

  externals: {
          fs: '{}',
          tls: '{}',
          net: '{}',
          console: '{}'
  }
};
