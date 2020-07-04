var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs')
const path = require('path')

module.exports = {
    mode: 'development', 
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }

          ] 
        },
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader',
            'glslify-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/shaders', to: 'shaders' },
          { from: 'src/styles', to: 'styles' },
        ]
      })
    ],
    watch: true,
    devServer: {
      host: '0.0.0.0',
      https: true,
      contentBase: [
        path.join(__dirname, 'src')
      ],
      key: fs.readFileSync('/Users/jimjohnston/Sites/localhost+2-key.pem'),
      cert: fs.readFileSync('/Users/jimjohnston/Sites/localhost+2.pem'),
      ca: fs.readFileSync('/Users/jimjohnston/Library/Application Support/mkcert/rootCA.pem'),
    }
  };