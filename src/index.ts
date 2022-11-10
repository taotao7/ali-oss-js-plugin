import OSS from 'ali-oss';
import { isBrowser } from './utils';

class Utils {
  ossClient: OSS;

  constructor(oss: OSS) {
    this.ossClient = oss;
  }

  async addFolder(folder: string[] | string) {
    let folderPath;
    if (Array.isArray(folder)) {
      folderPath = folder.join('/') + '/';
    } else {
      folderPath = folder + '/';
    }

    let blob: Buffer | Blob = Buffer.from([]);
    if (isBrowser()) {
      blob = new Blob([]);
    }
    try {
      return await this.ossClient.put(folderPath, blob);
    } catch (e) {
      console.log(e);
    }
  }
}

export default Utils;
