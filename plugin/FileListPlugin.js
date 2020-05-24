// 生成一个目录项目目录的文件夹
module.exports = class FileListPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.hooks.emit.tap('fileListPlugin', (compilation) => {
            let assets = compilation.assets
            let content = 'In this build:\r\n'
            Object.entries(assets).forEach(([fileName, fileSize]) => {
                content += `--${fileName} —— ${Math.ceil(fileSize.size() / 1024)}kb\r\n`
            })
            // console.log('====content====', content)
            assets[this.options.filename] = {
                source() {
                    return content
                },
                size() {
                    return content.length
                }
            }
        })
    }
}