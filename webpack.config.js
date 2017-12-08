let path = require('path');
let SRC_DIR = path.join(__dirname, 'src');
let PUBLIC_DIR = path.join(__dirname, 'public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: PUBLIC_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include : SRC_DIR,
        loader: 'babel-loader',
        query : {
          presets : ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
     }
    ]
  }
};



