const CircularDependencyPlugin = require('circular-dependency-plugin');
const WorkerPlugin = require('worker-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path');

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------


// ----------------------------------------------------------

module.exports = env => {
    return ({
        mode: env.MODE,
        entry: [
            './src/index.ts',
        ],
        devtool: env.MODE === 'development' ? 'inline-source-map' : 'none',
        module: {
            rules: [{
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js',
            publicPath: '/',
            globalObject: 'self'
        },
        stats: {
            colors: true
        },
        plugins: [

            new WorkerPlugin({
                preserveTypeModule: true
            }),

            new HtmlWebpackPlugin({
                inject: 'head',
                template: 'src/index.html',
                base: '/'
            }),

            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /node_modules/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                allowAsyncCycles: false,
                // set the current working directory for displaying module paths
                cwd: process.cwd(),
              })
        ],
        performance: {
            hints: false
        }
    });
};