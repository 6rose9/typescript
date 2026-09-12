const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.ts",
    checkauth: "./src/auth/checkauth.ts",
    profile: "./src/auth/profile.ts",
    resetpassword: "./src/auth/resetpassword.ts",
    signup: "./src/auth/signup.ts",
    signin: "./src/auth/signin.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public", "dist"),
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      //   exclude: /node_modules/,
      // },
    ],
  },
  devServer: {
    static: path.resolve(__dirname,"public"), // multi pages application, we need to set the static folder to public
    hot: true,
    port: 3000,
  },
};
