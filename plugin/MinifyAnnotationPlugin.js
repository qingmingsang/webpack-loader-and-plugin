module.exports = class MinifyAnnotationPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = {};
  }
  apply(compiler) {
    var reg = /\/(\*)+.*(\*)+\//g; // 注释正则
    compiler.hooks.emit.tap("MinifyAnnotation",// 注册emit事件
      compilation => {// compilation对应所有编译的文件
        Object.keys(compilation.assets).forEach(filename => {
          let content = compilation.assets[filename].source();
          content = content.replace(reg, ""); // 替换掉注释
          // 返回新的内容
          compilation.assets[filename] = {
            source() {
              return content;
            },
            size() {
              return content.length;
            }
          };
        });
      });
  }
};