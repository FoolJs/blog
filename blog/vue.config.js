module.exports = {
    /*
     *部署应用包时候的基本URL，
     *默认假设部署在域名的根部，
     *若不是，需要指定子路径，
     */
    publicPath: '/',
    /*
     *打包时构建文件的目标目录，
     */
    outputDir: 'dist',
    /*
     *是否使用包含运行时编译器的Vue构建版本。
     */
    runtimeCompiler: false,
    /*
     *是否需要生产环境的sourceMap？
     *sourceMap好像是一个位置文件，
     *保存着转换后代码的位置和对应的转换前的位置，
     */
    productionSourceMap: false,
    /*
     *允许对内部的webpack配置
     *进行更细密度的修改 ，
     */
    chainWebpack: () => {},
    configureWebpack: () => {},
    /*
     *CSS相关配置，
     */
    css: {
        /*
         *向 CSS 相关的 loader 传递选项，
         *用来配置CSS预处理器，
         */
        loaderOptions: {
            /*
             *配置SASS预处理器
             *一个全局的SASS文件，
             *可以在任何地方使用文件内的变量和函数，
             */
            sass: {
                prependData: `@import "@/assets/css/common.scss";`,
            },
        },
    },
    /*
     *开发环境的web服务器配置，
     */
    devServer: {
        /*
         *open：是否自动启动浏览器，
         *host，port端口号，
         */
        open: false,
        host: 'localhost',
        port: 8080,
        https: false,
        /*
         *devServer.disableHostCheck配置项用于配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。
         *DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。
         *它通常用于搭配--host 0.0.0.0使用，因为你想要其它设备访问你本地的服务，
         *但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。
         */
        disableHostCheck: false,
        /*
         *设置代理，用于前后端分离产生的跨域问题，
         * /api的意思是在你访问请求为/api开头的时候，
         * 代理到下面配置的target，所以需要在Axios那里设置
         * baseURL为/api，
         */
        proxy: {
            '/api': {
                target: 'http://localhost:4040',
                changOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};
