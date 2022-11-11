import OSS from 'ali-oss';
// @ts-ignore
import Utils from '../src/index';
import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, it } from 'vitest';
import { config, cleanAllBucket } from './config';

describe('node test', () => {
  const bucket = config.bucket;
  const region = config.region;
  const client = new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
  });
  const utils = Utils(client);
  beforeAll(async () => {
    //create bucket
    await client.putBucket(bucket);
    await client.useBucket(bucket);
  });

  afterAll(() => {
    cleanAllBucket(client);
  });

  it('should add folder 123/sss/xxxx/', async function () {
    const folder = ['123', 'sss', 'xxxx'];
    await utils.addFolder(folder);
    // @ts-ignore
    const res = await client.listV2();
    assert.equal(res.objects[0].name, folder.join('/') + '/');
  });

  it('should add folder xxxx/', async function () {
    const folder = 'xxxx';
    await utils.addFolder(folder);
    // @ts-ignore
    const res = await client.listV2();
    assert.equal(res.objects[1].name, folder + '/');
  });
});
