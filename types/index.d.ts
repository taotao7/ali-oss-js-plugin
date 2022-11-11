import OSS from 'ali-oss';
export interface IUtils {
    addFolder: Function;
}
declare class Utils implements IUtils {
    private static instance;
    private ossClient;
    private constructor();
    static getInstance(oss: OSS): Utils;
    addFolder(folder: string | string[]): Promise<OSS.PutObjectResult>;
}
export declare function getInstance(oss: OSS): Utils;
export {};
