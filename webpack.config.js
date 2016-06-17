module.exports = {
  entry: [
    './app/static/Index.jsx'
  ],
  output: {
    path: './app/static/dist',
    filename: 'bundle.js'
  },
  watchOptions: {
    poll: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
