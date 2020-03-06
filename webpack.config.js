module.exports = { //exportando o arquivo para poder ser importado.
    entry: ['@babel/polyfill', './src/main.js'], //Arquivo principal.
    output: { //Para qual arquivo vai ser convertido.
        path: __dirname + '/public', //Pasta raiz, onde se encontra o webpack config.
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public',
    },
    module: {
        rules: [{ //regras para definir como vai ser configurado o loader (babel)
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }],
    },
};