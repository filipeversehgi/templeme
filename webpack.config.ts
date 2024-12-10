import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  target: "node",
  devtool: "inline-source-map",
  mode: "production",
  externals: [],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"], //resolve all the modules other than index.ts
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.ts?$/,
      },
    ],
  },
};

export default config;
