const oss = require('ali-oss');
const env = process.env;
const STS = oss.STS;
const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const aliasify = require('aliasify');
const babelify = require('babelify');

function build(options, callback) {
  if (arguments.length === 1) {
    callback = options;
    // options = {};
  }

  const conf = {
    accessKeyId: env.ALI_SDK_STS_ID,
    accessKeySecret: env.ALI_SDK_STS_SECRET,
    roleArn: env.ALI_SDK_STS_ROLE,
    bucket: env.ALI_SDK_STS_BUCKET,
    region: env.ALI_SDK_STS_REGION,
  };

  const store = STS({
    accessKeyId: conf.accessKeyId,
    accessKeySecret: conf.accessKeySecret,
  });

  store.assumeRole(conf.roleArn).then((result) => {
    const stsConf = JSON.parse(result.res.data);
    const tmpdir = path.join(__dirname, '../test/browser/.tmp');
    const stsConfFile = tmpdir + '/stsConfig.json';
    if (!fs.existsSync(tmpdir)) {
      fs.mkdirSync(tmpdir);
    }
    fs.writeFile(
      stsConfFile,
      JSON.stringify(
        Object.assign({}, stsConf, {
          bucket: conf.bucket,
          region: conf.region,
        }),
      ),
      () => {
        fs.copyFileSync(
          `${__dirname}/../dist/oss-plugin.min.js`,
          `${__dirname}/../test/browser/lib/oss-plugin.min.js`,
        );

        const brOpts = {
          basedir: path.resolve(__dirname, '.'),
          fullPaths: false,
          debug: true,
        };
        browserify(brOpts)
          .add(['../test/browser/browser.test.js'])
          .transform(babelify, {
            global: true,
            // presets: ['@babel/env'],
            // plugins: ['transform-runtime', 'babel-plugin-transform-regenerator'],
          })
          .transform(aliasify, {
            global: true,
            // aliases: {
            //   zlib: false,
            //   'iconv-lite': false,
            // crypto: './shims/crypto/crypto.js',
            // },
            verbose: false,
          })
          .bundle(function (err, data) {
            if (err) return callback(err);
            var code = (data || '').toString();
            fs.unlinkSync(stsConfFile);
            callback(null, code);
          });
      },
    );
  });
}

if (require.main === module) {
  const opts = {
    minify: process.env.MINIFY ? true : false,
  };

  build(opts, function (err, code) {
    if (err) console.error(err.message);
    else console.log(code);
  });
}
