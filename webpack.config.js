"use strict";
exports.__esModule = true;
var path = require("path");
var glob = require("glob");
var constants_1 = require("ts-loader/dist/constants");
var entries = glob.sync("./src/modules/*.ts");

var rules = [
    {
        test: /\.ts$/,
        use: "ts-loader"
    }
];
// moduleのルールをセットする
var module = {
    rules: rules
};
// webpack configuration
var config = {
    resolve: {
        extensions: ['.js', '.ts']
    },
    entry: entries,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: module,
    mode: 'development',
    cache: true,
};
exports["default"] = config;
