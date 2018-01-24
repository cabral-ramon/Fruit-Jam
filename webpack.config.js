module.exports = {
  entry: "./lib/fruit_jam.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js"],
    root: [
    path.resolve('./src'),
  ],
  }
};
