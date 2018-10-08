
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = 
{
    devtool: "eval-source-map",
    entry: __dirname + "src/App.js",
    
    output:
    {
        path: __dirname + "build-webpack",
        filename: "bundle.js"
    },


  module: 
  {
    loaders: 
    [
      {
        test: /\.json$/,
        loader: "json"

      }, // json loader

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: 
        {
          presets: ['es2015','react']
       

"env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",
         // if you use React Native, pass "react-native" instead:
         "imports": ["react"],
         // this is important for Webpack HMR:
         "locals": ["module"]
       }]
       // note: you can put more transforms into array
       // this is just one of them!
     }]]
    }
  }

 } // babel query

      }, // babel loader
    
      {
        test: /\.css$/,
        loader: 'style!css?modules!postcss'

      }, // css loader


    ] // loaders

  }, // module


  postcss: 
  [
    require('autoprefixer')
  ],


  plugins: 
  [
    new HtmlWebpackPlugin(
    {
      template: __dirname + "/index.tmpl.html"
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],



  devServer: 
  {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }


} // module.exports
