"use strict";
var Utils = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    getInstance: () => getInstance
  });

  // src/utils/index.ts
  var isBrowser = () => {
    return !(typeof window === "undefined");
  };

  // src/index.ts
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
  return __toCommonJS(src_exports);
})();
