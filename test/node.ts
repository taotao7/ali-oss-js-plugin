import OSS from 'ali-oss';
import Utils from '../src/index';
import { assert, describe, it, beforeEach, afterEach } from 'vitest';

interface IUtils {
  ossClient: OSS;
  utils: Utils;
}

describe('node test', () => {
  beforeEach<IUtils>((context) => {
    const client = new OSS({
      accessKeyId: process.env.ALI_SDK_OSS_ID as string,
      accessKeySecret: process.env.ALI_SDK_OSS_SECRET as string,
      bucket: 'xt-sdk-test',
      region: 'oss-cn-chengdu',
    });

    context.ossClient = client;
    context.utils = new Utils(client);
  });

  it<IUtils>('should add folder 123/sss/xxxx/', async function ({ utils, ossClient }) {
    const folder = ['123', 'sss', 'xxxx'];
    await utils.addFolder(folder);
    // @ts-ignore
    const res = await ossClient.listV2();
    assert.equal(res.objects[0].name, folder.join('/') + '/');
  });
});
