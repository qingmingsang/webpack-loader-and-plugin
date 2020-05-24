let MyPlugin_skeleton = function (options) {
    this.template = options.template;
};
MyPlugin_skeleton.prototype.apply = function (compiler) {
    console.log('生成骨架中...');
    compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, callback) => {
            /**
             * htmlData是打包dist后 index.html 的内容
             * 然后用replace去替换掉
             */
            // console.log(htmlData)
            htmlData.html = htmlData.html.replace(
                `<div id="app"></div>`,
                `<div id="app">
                        ... 这里是写好的骨架屏样式
                 </div>`
            );
            callback(null, htmlData);
        });
    });
};
module.exports = MyPlugin_skeleton;