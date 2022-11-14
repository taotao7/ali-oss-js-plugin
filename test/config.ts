// @ts-nocheck
import OSS from 'ali-oss';

export const config = (env: string) => {
  if (env === 'node') {
    return {
      bucket: `ali-oss-${process.platform}-${process.arch}-${process.version.replaceAll(
        '.',
        '-',
      )}-${new Date().valueOf()}`,
      region: 'oss-cn-hangzhou',
      accessKeyId: process.env.ALI_SDK_OSS_ID as string,
      accessKeySecret: process.env.ALI_SDK_OSS_SECRET as string,
    };
  }
  return {
    bucket: process.env.ALI_SDK_STS_BUCKET ? process.env.ALI_SDK_STS_BUCKET : 'borwser-sdk-test',
    region: process.env.ALI_SDK_STS_REGION ? process.env.ALI_SDK_STS_REGION : 'oss-cn-hangzhou',
    accessKeyId: process.env.ALI_SDK_STS_OSS_ID as string,
    accessKeySecret: process.env.ALI_SDK_STS_OSS_SECRET as string,
    ram: process.env.ALI_SDK_STS_ROLE,
  };
};

export const cleanAllBucket = (store) => {
  store.listBuckets().then((r) => {
    const bucketList = [];
    r.buckets.forEach((i) => {
      if (i.name.indexOf('ali-oss') === 0) {
        if (calculateData(i.name) < interval) {
          bucketList.push({
            bucket: i.name,
            region: i.region,
          });
        }
      }
    });

    for (const bucketListItem of bucketList) {
      const client = new OSS({
        ...store.options,
        bucket: bucketListItem.bucket,
        region: bucketListItem.region,
      });

      cleanBucket(client, bucketListItem.bucket).catch((e) => {
        console.log('bucket name =======>', bucketListItem.bucket);
        console.log('error:====>', e);
      });
    }
  });
};

async function cleanBucket(store: OSS, bucket: string, multiversion: any) {
  store.useBucket(bucket);
  let result;
  const options = { versionId: null };

  if (!multiversion) {
    try {
      await store.getBucketVersions({
        'max-keys': 1000,
      });
      multiversion = true;
    } catch (error) {
      multiversion = false;
    }
  }

  async function handleDelete(deleteKey) {
    if (multiversion) {
      result = await store.getBucketVersions({
        'max-keys': 1000,
      });
    } else {
      result = await store.list({
        'max-keys': 1000,
      });
    }
    result[deleteKey] = result[deleteKey] || [];

    await Promise.all(
      result[deleteKey].map((_) =>
        store.delete(
          _.name,
          multiversion ? Object.assign({}, options, { versionId: _.versionId }) : options,
        ),
      ),
    );
  }

  await handleDelete('objects');
  if (multiversion) {
    await handleDelete('deleteMarker');
  }

  result = await store.listUploads({
    'max-uploads': 1000,
  });
  const uploads = result.uploads || [];
  await Promise.all(uploads.map((_) => store.abortMultipartUpload(_.name, _.uploadId)));

  const channels = (await store.listChannels()).channels.map((_) => _.Name);
  await Promise.all(channels.map((_) => store.deleteChannel(_)));
  await store.deleteBucket(bucket);
}

const calculateData = (bucket: any) => {
  return parseInt(bucket.split('-').pop());
};
