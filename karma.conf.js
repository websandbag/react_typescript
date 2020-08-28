const args = process.argv;
args.splice(0, 4);

const polyfills = [];

// 配列を結合する
const files = polyfills.concat(args);

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files,
        preprocessors: {
            '**/*.spec.ts': ['webpack'],
            '**/*.spec.tsx': ['webpack']       
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        webpack: {
            resolve: {
                extensions: ['.ts', '.tsx', '.js']
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: 'ts-loader'
                            }
                        ]
                    }
                ]
            }
        },
        webpackMiddleware: {
            stats: 'errors-only',
            noInfo: true
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.Log_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
}