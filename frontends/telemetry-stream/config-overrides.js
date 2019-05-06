module.exports = function override(config, env) {
    if (!config.entry) {
        config.entry = [];
    }
    let newConfig = {
        ...config,
        entry: {
            app: config.entry,
            components: ["./src/BatteryStatusComponent.tsx"],
        },

    };
    newConfig.optimization.splitChunks = {
        cacheGroups: {
            default: false,
        },
    };

    newConfig.optimization.runtimeChunk = false;
    newConfig.output.filename = 'static/js/[name].js';
    newConfig.output.chunkFilename = 'static/js/[name].chunk.js';
    // remove hash from css files.
    for (let plugin in newConfig.plugins) {
        let p = newConfig.plugins[plugin];
        if (p.options && p.options.filename && p.options.chunkFilename) {
            p.options = {
                ...p.options,
                filename: 'static/css/[name].css',
                chunkFilename: 'static/css/[name].chunk.css'
            };
        }
    }
    return newConfig;
}