import colorname from './colorname';

const HEXLETTER = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
};
//转化为10进制
export function get16(value: string) {
  return parseInt(value, 16);
}
//转化为16位进制
export function to16(vv: number): string {
  let value = parseInt(vv + '');
  if (value >= 0 && value <= 255) {
    let letter = ['A', 'B', 'C', 'D', 'E', 'F'];
    if (value <= 9) {
      return '0' + value;
    } else if (value > 9 && value < 16) {
      return '0' + letter[value - 10];
    } else if (value >= 16) {
      let shi: number | string = parseInt((value / 16).toFixed(0));
      let ge: number | string = value % 16;

      if (shi > 9 && shi < 16) {
        shi = letter[shi - 10];
      }
      if (ge <= 9) {
        return shi + '' + ge;
      } else if (ge > 9 && ge < 16) {
        return shi + '' + letter[ge - 10];
      }
    }
  }
  return '00';
}
export interface ColorResultType {
  red: number;
  green: number;
  blue: number;
  result: string;
  alpha: number;
  rgba: string;
}
//解析#XXXXXX颜色
export function parseHexColor(val: string): ColorResultType {
  let color = val.toUpperCase();
  let value = '';
  let alpha = 1;
  if (color.length === 7) {
    value = color.substring(1);
  } else if (color.length === 4) {
    value = color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
  } else if (color.length === 3) {
    value = color[1] + color[1] + color[1] + color[2] + color[2] + color[2];
  } else if (color.length === 9) {
    value = color.substring(1, 7);
    alpha = get16(value.substring(7, 9)) / 255;
  }
  if (value.length == 6) {
    let red = get16(value.substring(0, 2));
    let green = get16(value.substring(2, 4));
    let blue = get16(value.substring(4, 6));
    return {
      red,
      green,
      blue,
      result: '#' + value,
      alpha,
      rgba: `rgba(${red},${green},${blue},${alpha})`
    };
  } else {
    return {
      red: 255,
      green: 255,
      blue: 255,
      result: '#FFFFFF',
      alpha: 1,
      rgba: `rgba(255,255,255,1)`
    };
  }
}
function trimStr(str: string) {
  if (str) {
    return str.replace(/\s/g, '');
  }
  return str;
}

//解析颜色
export function getColor(color: string): ColorResultType {
  let red = 255,
    green = 255,
    blue = 255,
    result = '#FFFFFF',
    alpha = 1;
  if (color && typeof color == 'string') {
    if (/^rgba\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9\.]+\s*\)$/.test(color)) {
      const value = color.substring(5, color.length - 1).split(',');
      red = parseInt(trimStr(value[0]));
      green = parseInt(trimStr(value[1]));
      blue = parseInt(trimStr(value[2]));
      alpha = Number(trimStr(value[3]));
      result = '#' + to16(red) + to16(green) + to16(blue);
    } else if (/^rgb\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)$/.test(color)) {
      const value = color.substring(4, color.length - 1).split(',');
      red = parseInt(trimStr(value[0]));
      green = parseInt(trimStr(value[1]));
      blue = parseInt(trimStr(value[2]));
      result = '#' + to16(red) + to16(green) + to16(blue);
    } else if (
      /^#[0-9a-fA-F]{6}$/.test(color) ||
      /^#[0-9a-fA-F]{3}$/.test(color) ||
      /^#[0-9a-fA-F]{8}$/.test(color) ||
      /^#[0-9a-fA-F]{2}$/.test(color)
    ) {
      return parseHexColor(color);
    } else if (color.match(/^[a-zA-Z]+$/)) {
      const cc = color.toLowerCase();
      const c = colorname.find((item) => item.name == cc);
      if (c) {
        return parseHexColor(c.value);
      }
    }
  }

  return {
    red,
    green,
    blue,
    result,
    alpha: alpha >= 0 && alpha <= 1 ? alpha : 1,
    rgba: `rgba(${red},${green},${blue},${alpha})`
  };
}

export function getGadientArray(startColor: string, endColor: string, step: number): string[] {
  let { red: startR, green: startG, blue: startB } = getColor(startColor);
  let { red: endR, green: endG, blue: endB } = getColor(endColor);

  let sR = (endR - startR) / step; //总差值
  let sG = (endG - startG) / step;
  let sB = (endB - startB) / step;
  let colorArr = [];
  for (let i = 0; i < step; i++) {
    //计算每一步的hex值

    let c =
      'rgb(' +
      (sR * i + startR).toFixed(0) +
      ',' +
      (sG * i + startG).toFixed(0) +
      ',' +
      (sB * i + startB).toFixed(0) +
      ')';
    // console.log('%c' + c, 'background:' + c);

    colorArr.push(c);
  }
  return colorArr;
}
/**
 *
 * @param c {string}颜色
 * @param l {number}浅色度，范围0~1
 * @returns {string} 浅颜色
 */
export function getLightColor(c: string, l: number = 0.4) {
  let color = getColor(c);

  return `rgba(${color.red + parseInt(((255 - color.red) * l).toFixed(0))},${
    color.green + parseInt(((255 - color.green) * l).toFixed(0))
  },${color.blue + parseInt(((255 - color.blue) * l).toFixed(0))},1)`;
}

/**
 *
 * @param c {string}颜色
 * @param l {number}暗色度，范围0~1
 * @returns {string} 暗颜色
 */
export function getDarkColor(c: string, l: number = 0.8) {
  let color = getColor(c);
  return `rgba(${(color.red * l).toFixed(0)},${(color.green * l).toFixed(0)},${(
    color.blue * l
  ).toFixed(0)},1)`;
}
