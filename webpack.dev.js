const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  watch: true,
  output: {
    path: path.resolve(__dirname, './work/scripts'),
    filename: 'dashboard_widget.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
      },
      {
        test: /\.(png|jpg|gif|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './work'),
    compress: true,
    writeToDisk: true,
    port: 8000,
    publicPath: "/scripts/",
    watchContentBase: true,
    open: true,
    openPage: "",
    overlay: true,    
  }
};
