var path = require('path');
var webpack = require('webpack');
var PathRewriterPlugin = require('webpack-path-rewriter');

var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("development")
    }
});

var staticPath = 'web server'

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8001',
    'webpack/hot/only-dev-server',
    './public/js/boot.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8001/static/'
  },                                                                                         
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new PathRewriterPlugin(),
    definePlugin
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /[.]jade$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '[name].html',
          loader: 'jade-html?' + JSON.stringify({ pretty: true , staticPath: staticPath})
        })
      },{
        test: /\.json$/,
        loaders: ['json']
      },{
        test: /\.(css|scss|pcss)$/,
        loader: 'style?singleton!css?-autoprefixer&-minimize&sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss!sass'
      },{
        test: /\.png$/,
        loader: 'url?limit=8192&name=assets/imgs/[hash].png'
      },{
        test: /\.jpg$/,
        loader: 'file'
      },{
        test: /\.svg$/,
        loader: 'babel!svg-react'
      }
    ]
    
  },
  
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
