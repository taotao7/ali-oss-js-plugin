"use strict";
var Utils = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/utils/index.ts
  var isBrowser;
  var init_utils = __esm({
    "src/utils/index.ts"() {
      "use strict";
      isBrowser = () => {
        return !(typeof window === "undefined");
      };
    }
  });

  // src/index.ts
  var require_src = __commonJS({
    "src/index.ts"(exports, module) {
      init_utils();
      var Utils = class {
        constructor(oss) {
          this.ossClient = oss;
        }
        static getInstance(oss) {
          if (!Utils.instance) {
            Utils.instance = new Utils(oss);
          }
          return Utils.instance;
        }
        async addFolder(folder) {
          let folderPath = "";
          if (Array.isArray(folder)) {
            folderPath = folder.join("/") + "/";
          } else {
            folderPath = folder + "/";
          }
          let blob;
          if (isBrowser()) {
            blob = new Blob([]);
          } else {
            blob = Buffer.from([]);
          }
          return await this.ossClient.put(folderPath, blob);
        }
      };
      function getInstance(oss) {
        return Utils.getInstance(oss);
      }
      module.exports = getInstance;
    }
  });
  return require_src();
})();
