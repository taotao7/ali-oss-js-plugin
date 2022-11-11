# ali-oss-js-plugin
This project is based on ali-oss, which encapsulates methods that will be commonly used

coverage: todo

## install
node:
  npm install ali-oss-plugin --save

react/vue:
  npm install ali-oss-plugin --save

browser:
  copy dist/oss-plugin.min.js to your project

[addFolder](#addFolder)

## object 

### addFolder
Add the directory to the corresponding bucket
parameters:
  - name {String|String[]}  One-level directories use strings, multi-level directories use arrays

```javascript
// first level catalog
const ossClient = new OSS({
  accessKeyId: "your ak",
  accessKeySecret: "your sk",
  bucket: "bucket",
  region: "region",
})
const utils = Utils(ossClient)

utils.addFolder('1')

// multi level catalog
const ossClient = new OSS({
  accessKeyId: "your ak",
  accessKeySecret: "your sk",
  bucket: "bucket",
  region: "region",
})
const utils = Utils(ossClient)

utils.addFolder(['1','2','3'])

```
