process.env.CHROME_BIN = require('puppeteer').executablePath();
const isCiEnv = process.env.ONCI;

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'browserify'],
    plugins: [
      require('karma-mocha'),
      require('karma-browserify'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
    ],
    browsers: isCiEnv ? ['ChromeHeadless'] : ['Chrome', 'Safari', 'Firefox'],
    files: [
      'test/browser/lib/aliyun-oss-sdk.min.js',
      'test/browser/lib/oss-plugin.min.js',
      'test/browser/tests.js',
    ],
    reporters: ['progress'],
    port: 19876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 30000,
    concurrency: 1,
    client: {
      mocha: {
        timeout: 6000,
      },
    },
  });
};
