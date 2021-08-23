const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 8000,
    contentBase: ["./src", "./public"], // both src and output dirs
    inline: true,
    hot: true,
  },
});
