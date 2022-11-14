const stsConfig = require('./.tmp/stsConfig.json');
const assert = require('assert');
const convert = require('xml-js');

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const getJson = (data) => {
  return JSON.parse(
    convert.xml2json(data, {
      compact: true,
      space: 2,
      trim: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreAttributes: true,
      ignoreComment: true,
      alwaysChildren: true,
      ignoreDoctype: true,
      // ignoreText: true,
      // alwaysArray: true,
    }),
  );
};

const client = OSS({
  region: stsConfig.region,
  accessKeyId: stsConfig.Credentials.AccessKeyId,
  accessKeySecret: stsConfig.Credentials.AccessKeySecret,
  stsToken: stsConfig.Credentials.SecurityToken,
  bucket: stsConfig.bucket,
});
const utils = Utils.getInstance(client);

describe('browser test', () => {
  it('should add folder 123/sss/xxxx/', async () => {
    const folder = ['123', 'sss', 'xxxx'];
    await utils.addFolder(folder);
    const res = await client.list();
    assert.equal(
      getJson(res.res.data).ListBucketResult.Contents[0].Key._text,
      folder.join('/') + '/',
    );
  });

  it('should add folder xxxx/', async () => {
    const folder = 'xxxx';
    await utils.addFolder(folder);
    const res = await client.list();
    assert.equal(getJson(res.res.data).ListBucketResult.Contents[1].Key._text, folder + '/');
  });
});
