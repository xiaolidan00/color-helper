export declare function get16(value: string): number;
export declare function to16(value: number): string;
export interface ColorResultType {
    red: number;
    green: number;
    blue: number;
    result: string;
    alpha: number;
    rgba: string;
}
export declare function parseHexColor(val: string): ColorResultType;
export declare function getColor(color: string): ColorResultType;
export declare function getGadientArray(startColor: string, endColor: string, step: number): string[];
/**
 *
 * @param c {string}颜色
 * @param l {number}浅色度，范围0~1
 * @returns {string} 浅颜色
 */
export declare function getLightColor(c: string, l?: number): string;
/**
 *
 * @param c {string}颜色
 * @param l {number}暗色度，范围0~1
 * @returns {string} 暗颜色
 */
export declare function getDarkColor(c: string, l?: number): string;
