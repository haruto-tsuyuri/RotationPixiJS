import * as webpack from "webpack";
import * as path from "path";
import * as glob from "glob";

const entries = glob.sync("./src/modules/*.ts"); // get all js file in modules directory

const rules: webpack.RuleSetRule[] =
    [
        {
            test: /\.ts$/, // ローダーを設定するファイル名、この場合全Typescriptファイル
            use: "ts-loader", // use ts-loader transpile
        }
    ];

// moduleのルールをセットする
const module: webpack.RuleSetRule = {
    rules: rules
};

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
