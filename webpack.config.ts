import * as webpack from "webpack";
import * as path from "path";
import * as glob from "glob";
import {nodeModules} from "ts-loader/dist/constants";

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


    resolve: {
        // resolve extensions. see also https://webpack.js.org/configuration/resolve/
        extensions: ['.js', '.ts']
    },
    entry: entries,
    target: 'node',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: module,
    mode: 'development',
    cache: true,
    externals: nodeModules,
};

export default config;
