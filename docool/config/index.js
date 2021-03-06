var Nconf       = require('nconf'),
    nconf       = new Nconf.Provider(),
    path        = require('path'),
    fs          = require('fs'),
    _           = require('lodash'),
    stripJsonComments = require('strip-json-comments'),
    logger      = require('../logger'),
    defaultConfig,
    customConfig = {};

defaultConfig = JSON.parse(stripJsonComments(fs.readFileSync(path.resolve(__dirname, './default.json'), 'utf8')));

try {
    customConfig = stripJsonComments(fs.readFileSync(process.cwd() + '/docool.json', 'utf8'));
    if (customConfig) {
        customConfig = JSON.parse(customConfig);

        customConfig.plugins = _.concat(defaultConfig.plugins, customConfig.plugins || []);
        customConfig.globs = _.concat(defaultConfig.globs, customConfig.globs || []);
    }
    nconf.overrides(customConfig);
} catch (e) {
    logger.fatal('Do you have docool.json in your current path or it is Incorrect josn format.')
}

nconf.defaults(defaultConfig);

nconf.argv();

nconf.env({
    separator: ':'
});

module.exports = nconf;
