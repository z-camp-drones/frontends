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
    console.log(newConfig.plugins);
    return newConfig;
}