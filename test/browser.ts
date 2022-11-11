import { it, assert, beforeAll, afterAll, describe } from 'vitest';
import fs from 'fs';
import OSS from 'ali-oss';
import { preview } from 'vite';
import { getInstance as Utils } from '../src/index';
import { config } from './config';
import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';
import type { PreviewServer } from 'vite';

describe('browser test', () => {
  const client = new OSS({
    ...config,
  });
  const utils = Utils(client);
  const lib = fs.readFileSync('./dist/oss-plugin-min.js', { encoding: 'utf-8' });
  const bucket = config.bucket;

  let server: PreviewServer;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    server = await preview({ preview: { port: 9999 } });
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.addScriptTag({
      content: lib,
    });

    await client.putBucket(bucket);
    client.useBucket(bucket);
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  });

  it('should add folder 123/sss/xxxx/', async () => {
    await page.goto('http://localhost:9999');
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
