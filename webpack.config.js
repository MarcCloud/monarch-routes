module.exports = {
    entry: './index.js',
    output: {
        path: './build',
        filename: 'monarch-routes.js',
        library: 'Router',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }]
    }
};
