const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

module.exports = function (proxy, allowedHost) {
    return {
        // 其他配置
        setupMiddlewares(middlewares, devServer) {
            // 如果有任何 onBeforeSetupMiddleware 中的中间件
            devServer.app.use(
                '/api',
                createProxyMiddleware({
                    target: process.env.REACT_APP_SERVE,
                    changeOrigin: true,
                    pathRewrite: { '^/api': '' }, // 确保代理转发的路径正确
                })
            );
            // Keep `evalSourceMapMiddleware`
            // middlewares before `redirectServedPath` otherwise will not have any effect
            // This lets us fetch source contents from webpack for the error overlay
            devServer.app.use(evalSourceMapMiddleware(devServer));

            if (fs.existsSync(paths.proxySetup)) {
                // This registers user provided middleware for proxy reasons
                require(paths.proxySetup)(devServer.app);
            }
            // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
            devServer.app.use(redirectServedPath(paths.publicUrlOrPath));

            // This service worker file is effectively a 'no-op' that will reset any
            // previous service worker registered for the same host:port combination.
            // We do this in development to avoid hitting the production cache if
            // it used the same host and port.
            // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
            devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
            return middlewares;
        },
        // 其他配置
    };
};

