const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglify-js-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        // vue-loader config to load `.vue` files or single file components.
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      compress: true,
      mangle: true,
      comments: false,
      sourceMap: true,
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: '../dist/index.html' },
      { from: './src/css', to: '../dist/css' },

      { from: './nginx.conf', to: '../dist/nginx.conf' },
    ]),

  ],
};
