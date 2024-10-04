module.exports = function override(config, env) {
    if (env === 'development') {
        config.devServer = {
            ...config.devServer,
            https: true, // Ensures that the dev server runs with HTTPS
        };
    }
    return config;
};
