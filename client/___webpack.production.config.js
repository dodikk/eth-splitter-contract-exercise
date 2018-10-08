
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = 
{
    entry: __dirname + "/src/App.js",
    
    output:
    {
        path: __dirname + "/build-webpack",
        filename: "bundle.js"
    },


  module: 
  {
    rules: 
    [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: 
        {
//          presets: ['es2015','react']
            "presets": 
            [
//                "es2015",
//                "react",
                "@babel/preset-env"  , 
                "@babel/preset-react", 
//                "@babel/plugin-proposal-class-properties"
            ],
            
            "plugins" : 
            [
                "@babel/plugin-syntax-class-properties",
//                "plugin-syntax-class-properties",
            ],

     
        } // babel query

      }, // babel loader
    
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules-loader!postcss-loader'

      }, // css loader


    ] // loaders

  }, // module




  plugins: 
  [


    new HtmlWebpackPlugin(
    {
      template: __dirname + "/index.tmpl.html"
    }),

new webpack.LoaderOptionsPlugin({

options : {

  postcss: 
  [
    require('autoprefixer')
  ],

} // options

}), // LoaderOptionsPlugin


  ],


} // module.exports
