"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Utils {
    constructor(oss) {
        this.ossClient = oss;
    }
    addFolder(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            let folderPath;
            if (Array.isArray(folder)) {
                folderPath = folder.join('/') + '/';
            }
            else {
                folderPath = folder + '/';
            }
            let blob = Buffer.from([]);
            if ((0, utils_1.isBrowser)()) {
                blob = new Blob([]);
            }
            try {
                return yield this.ossClient.put(folderPath, blob);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = Utils;
//# sourceMappingURL=index.js.map