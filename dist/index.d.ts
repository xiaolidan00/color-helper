/** * 转化为10进制
 * @param {string} value - 十六进制字符
 * @returns {number} 十进制数值*/
export declare function get16(value: string): number;
/** * 转化为16位进制
 * @param {number} value - 十进制数值
 * @returns {string} 十六进制字符*/
export declare function to16(value: number): string;
export interface ColorResultType {
    red: number;
    green: number;
    blue: number;
    result: string;
    alpha: number;
    rgba: string;
}
/** * 解析#XXXXXX颜色
 * @param {string} val - #XXXXXX颜色
 * @returns {ColorResultType} 颜色结果*/
export declare function parseHexColor(val: string): ColorResultType;
/** * 解析颜色
 * @param {string} color - 颜色字符串
 * @returns {ColorResultType} 颜色结果*/
export declare function getColor(color: string): ColorResultType;
/** * 获取渐变颜色数组
 * @param {string} startColor - 开始颜色
 * @param {string} endColor - 结束颜色
 * @param {number} step - 多少个渐变颜色
 * @returns {string[]} 颜色数组*/
export declare function getGadientArray(startColor: string, endColor: string, step: number): string[];
/**
 * 获取浅色
 * @param c {string}颜色
 * @param l {number}浅色度，范围0~1
 * @returns {string} 浅颜色
 */
export declare function getLightColor(c: string, l?: number): string;
/**
 * 获取深色
 * @param c {string}颜色
 * @param l {number}暗色度，范围0~1
 * @returns {string} 暗颜色
 */
export declare function getDarkColor(c: string, l?: number): string;
