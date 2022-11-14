import OSS from 'ali-oss';
import { IUtils as IU, getInstance as Utils } from '../src/index';
import { assert, beforeAll, beforeEach, describe, it } from 'vitest';
import { config } from './config';

interface IUtils {
  ossClient: OSS;
  utils: IU;
}

const conf = config('node');

const bucket = conf.bucket;
const region = conf.region;

const client = new OSS({
  accessKeyId: conf.accessKeyId,
  accessKeySecret: conf.accessKeySecret,
});

beforeAll(async () => {
  //create bucket
  await client.putBucket(bucket);
  client.useBucket(bucket);
});

describe('node test', () => {
  beforeEach<IUtils>((context) => {
    context.ossClient = client;
    context.utils = Utils(client);
  });

  it<IUtils>('should add folder 123/sss/xxxx/', async function ({ ossClient, utils }) {
    const folder = ['123', 'sss', 'xxxx'];
    await utils.addFolder(folder);
    // @ts-ignore
    const res = await ossClient.listV2();
    assert.equal(res.objects[0].name, folder.join('/') + '/');
  });

  it<IUtils>('should add folder xxxx/', async function ({ ossClient, utils }) {
    const folder = 'xxxx';
    await utils.addFolder(folder);
    // @ts-ignore
    const res = await ossClient.listV2();
    assert.equal(res.objects[1].name, folder + '/');
  });
});
