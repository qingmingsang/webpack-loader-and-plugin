const path = require('path');
const FileListPlugin = require('./plugin/FileListPlugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new FileListPlugin({ filename: 'filelist.md' })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve(__dirname, 'loader', 'demo.js'),
                        options: { name: 'my friend' }
                    }
                ]
            }
        ]
    },
    mode: 'none'
};