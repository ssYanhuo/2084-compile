module.exports = {
    devServer: {
        proxy: {
            '/api_NFA': {
                target: 'http://13.70.38.82:8082/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api_NFA': ''
                }
            },
            '/api_DFA': {
                target: 'http://13.70.38.82:8083/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api_DFA': ''
                }
            },
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
