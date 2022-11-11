import OSS from 'ali-oss';
import { isBrowser } from './utils';

export interface IUtils {
  addFolder: Function;
}

class Utils implements IUtils {
  private static instance: Utils;
  private ossClient: OSS;

  private constructor(oss: OSS) {
    this.ossClient = oss;
  }

  public static getInstance(oss: OSS): Utils {
    if (!Utils.instance) {
      Utils.instance = new Utils(oss);
    }
    return Utils.instance;
  }

  public async addFolder(folder: string | string[]) {
    let folderPath: string = '';

    if (Array.isArray(folder)) {
      folderPath = folder.join('/') + '/';
    } else {
      folderPath = folder + '/';
    }

    let blob: Buffer | Blob | string;
    if (isBrowser()) {
      blob = new Blob([]);
    } else {
      blob = Buffer.from([]);
    }
    return await this.ossClient.put(folderPath, blob);
  }
}

export function getInstance(oss: OSS) {
  return Utils.getInstance(oss);
}
