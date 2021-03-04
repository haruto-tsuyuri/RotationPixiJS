import * as webpack from "webpack";
import * as path from "path";
import * as glob from "glob";

const entries = glob.sync("./src/modules/*.ts"); // get all js file in modules directory

// webpack rules
const rules: webpack.RuleSetRule[] =
    [
        {
            test: /\.ts$/, // loaded file extension
            use: "ts-loader", // use ts-loader transpile
        }
    ];

// moduleのルールをセットする
const module: webpack.RuleSetRule = {
    rules: rules
};

// webpack configuration
const config: webpack.Configuration = {
    entry: entries,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: module,
    mode: 'development',
    cache: true
};

export default config;
