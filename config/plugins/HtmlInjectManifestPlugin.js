const fs = require('fs');

// We need html-webpack-plugin to work, so do a check
try {
    require('html-webpack-plugin');
}
catch (err) {
    throw new Error(`This plugin requires 'html-webpack-plugin' to work. Please install it using: npm i -D html-webpack-plugin`);
}

// We need webpack-manifest-plugin to work, so do a check
try {
    require('webpack-manifest-plugin');
}
catch (err) {
    throw new Error(`This plugin requires 'webpack-manifest-plugin' to work. Please install it using: npm i -D webpack-manifest-plugin`);
}

class HtmlInjectManifestPlugin {
    constructor(options) {
        options.files = options.files || [];
        
        this.options = options;
    }
    
    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('webpack-manifest-plugin-after-emit', (manifest, callback) => {
                let mergedManifest = {};
                
                // If files were provided, watch em
                if (this.options.files.length) {
                    const manifests = this.options.files
                        .map(file => JSON.parse(fs.readFileSync(file)));
                    
                    mergedManifest = Object.assign(mergedManifest, ...manifests);
                }
                
                mergedManifest = Object.assign(mergedManifest, manifest);
                
                compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, htmlPluginCallback) => {
                    htmlPluginData.plugin.options = htmlPluginData.options || {};
                    htmlPluginData.plugin.options.manifest = mergedManifest;
                    
                    htmlPluginCallback(null, htmlPluginData);
                });
                
                callback();
            });
        });
        
        /* This is so that the manifest files are picked up by webpack watch */
        // compiler.plugin('emit', (compilation, callback) => {
        //     for (let file of this.options.files) {
        //         console.log(file);
        //
        //         compilation.fileDependencies.push(file);
        //     }
        //
        //     callback();
        // });
    }
}

module.exports = HtmlInjectManifestPlugin;