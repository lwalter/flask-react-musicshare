module.exports = {
  entry: [
    './app/static/app.jsx'
  ],
  output: {
    path: './app/static/dist',
    filename: 'bundle.js'
  },
  watchOptions: {
    poll: true
  },
  module: {
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
