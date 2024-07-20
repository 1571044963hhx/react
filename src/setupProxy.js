const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:3000',
            changeOrigin: true,
            allowedHosts: 'all', // 确保 allowedHosts 配置正确
        })
    );
};
