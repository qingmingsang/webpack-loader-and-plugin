# loader

https://www.webpackjs.com/contribute/writing-a-loader/
https://www.jianshu.com/p/6a08e1b1f2fd


# plugin
compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

compilation 实例继承于 compiler。
compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

webpack 插件是一个具有 apply 方法的 JavaScript 对象。
apply 方法会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

tap是给钩子函数中注册事件，钩子函数中都是会有各种task（任务），通过tap(name,task)就传入了对应的任务名和任务具体方法。
同步的钩子函数使用tap,异步的可以使用tap tapAsync tapPromise。


https://www.webpackjs.com/contribute/writing-a-plugin/
https://alienzhou.com/projects/webpack-internal-plugin-relation/
https://www.jianshu.com/p/f1df9cbf77ff
https://www.webpackjs.com/api/compiler-hooks/#emit

tapable库
```
const {
    Tapable,
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook
} = require("tapable");
class Compiler extends Tapable {
    constructor(context) {
        super();
        this.hooks = {
            /** @type {SyncBailHook<Compilation>} */
            shouldEmit: new SyncBailHook(["compilation"]),
            /** @type {AsyncSeriesHook<Stats>} */
            done: new AsyncSeriesHook(["stats"]),
            /** @type {AsyncSeriesHook<>} */
            additionalPass: new AsyncSeriesHook([]),
            /** @type {AsyncSeriesHook<Compiler>} */
            beforeRun: new AsyncSeriesHook(["compiler"]),
            /** @type {AsyncSeriesHook<Compiler>} */
            run: new AsyncSeriesHook(["compiler"]),
            /** @type {AsyncSeriesHook<Compilation>} */
            emit: new AsyncSeriesHook(["compilation"]),
            /** @type {AsyncSeriesHook<string, Buffer>} */
            assetEmitted: new AsyncSeriesHook(["file", "content"]),
            /** @type {AsyncSeriesHook<Compilation>} */
            afterEmit: new AsyncSeriesHook(["compilation"]),

            /** @type {SyncHook<Compilation, CompilationParams>} */
            thisCompilation: new SyncHook(["compilation", "params"]),
            /** @type {SyncHook<Compilation, CompilationParams>} */
            compilation: new SyncHook(["compilation", "params"]),
            /** @type {SyncHook<NormalModuleFactory>} */
            normalModuleFactory: new SyncHook(["normalModuleFactory"]),
            /** @type {SyncHook<ContextModuleFactory>}  */
            contextModuleFactory: new SyncHook(["contextModulefactory"]),

            /** @type {AsyncSeriesHook<CompilationParams>} */
            beforeCompile: new AsyncSeriesHook(["params"]),
            /** @type {SyncHook<CompilationParams>} */
            compile: new SyncHook(["params"]),
            /** @type {AsyncParallelHook<Compilation>} */
            make: new AsyncParallelHook(["compilation"]),
            /** @type {AsyncSeriesHook<Compilation>} */
            afterCompile: new AsyncSeriesHook(["compilation"]),

            /** @type {AsyncSeriesHook<Compiler>} */
            watchRun: new AsyncSeriesHook(["compiler"]),
            /** @type {SyncHook<Error>} */
            failed: new SyncHook(["error"]),
            /** @type {SyncHook<string, string>} */
            invalid: new SyncHook(["filename", "changeTime"]),
            /** @type {SyncHook} */
            watchClose: new SyncHook([]),

            /** @type {SyncBailHook<string, string, any[]>} */
            infrastructureLog: new SyncBailHook(["origin", "type", "args"]),

            // TODO the following hooks are weirdly located here
            // TODO move them for webpack 5
            /** @type {SyncHook} */
            environment: new SyncHook([]),
            /** @type {SyncHook} */
            afterEnvironment: new SyncHook([]),
            /** @type {SyncHook<Compiler>} */
            afterPlugins: new SyncHook(["compiler"]),
            /** @type {SyncHook<Compiler>} */
            afterResolvers: new SyncHook(["compiler"]),
            /** @type {SyncBailHook<string, Entry>} */
            entryOption: new SyncBailHook(["context", "entry"])
        };
    }}
```