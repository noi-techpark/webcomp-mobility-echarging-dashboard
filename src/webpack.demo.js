// SPDX-FileCopyrightText: 2021 NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './dashboard_widget.js',
  watch: false,
  output: {
    path: path.resolve(__dirname, '../../work/scripts'),
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
      }
    ]
  }
};
