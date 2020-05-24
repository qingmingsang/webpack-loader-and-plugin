module.exports = class CopyrightWebpackPlugin {
    /**
    * compiler是webpack的一个实例，这个实例存储了webpack各种信息，所有打包信息
    * https://webpack.js.org/api/compiler-hooks
    * 官网里面介绍了compiler里面有个hooks这样的概念
    * hooks是钩子的意思，里面定义了时刻值
    */
    apply(compiler) {
        /**
        * 用到了hooks，emit这个时刻，在输出资源之前，这里官网告诉我们是一个异步函数
        * compilation是这一次的打包信息，所以跟compiler是不一样的
        * tapAsync接受两个参数，第一个是名字，
        */
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            compilation.assets['copyright.txt'] = {
                source: function () {
                    return 'copyright by q'
                },
                size: function () {
                    return 15
                }
            };
            // 最后一定要调用cb
            cb();
        })
        /**
        * 同步的时刻跟异步的时刻写代码的方式不一样
        * 同步的时刻，后面只要一个参数就可以了
        */
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
            console.log('compiler');
        })
    }
}