/**
 * Created by Owner on 2/9/2017.
 */
const path = require('path');

module.exports = {
    context:__dirname,
    entry:{
        javascript:"./js/index.js",
        html:"./index.html"
    },
    output:{
        filename:"project.js",
        path:__dirname + "/dist"
    },
    resolve:{
        extensions:['','.js','.json','.jsx']
    },
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loaders:['babel-loader']
            },
            {
                test:/\.html$/,
                loader:'file-loader?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
}