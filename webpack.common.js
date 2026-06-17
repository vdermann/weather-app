import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        // To load the CSS.
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // To use local files in the JS.
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        // To use animated svg's.
        test: /\.svg$/,
        type: 'asset/source',
      },
    ],
  },
};
