function getSource(modulePath) {
    // 拿到匹配规则
    let rules = this.config.module.rules;
    // 拿到文件内容
    let content = fs.readFileSync(modulePath, "utf8");
    // 分别处理不同规则
    rules.forEach((rule, index) => {
        let { test, use } = rule;
        let len = use.length - 1;
        if (test.test(modulePath)) {
            // 如果匹配到了，也就是说这个模块需要用loader来转换
            function normalLoader() {
                let loader = require(use[len--]); // 因为loader规则是从下至上，从右至左的
                // 递归调用loader,实现转化功能
                // loader获取对应的loader函数
                content = loader(content);
                if (len >= 0) {
                    normalLoader(); // 如果还有loader，继续执行
                }
            }
            normalLoader();
        }
    });
    return content;
}