import colorname from './colorname';

//转化为10进制
export function get16(value: string) {
  if (value.match(/[0-9ABCDEF]{2}/g)) {
    let letter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let shi: number | string = value[0];
    let ge: number | string = value[1];
    shi = 16 * letter.findIndex((el) => el == shi);
    ge = letter.findIndex((el) => el == ge);
    return shi + ge;
  } else {
    return 0;
  }
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
//解析#XXXXXX颜色
export function parseResultColor(val: string) {
  let color = val.toUpperCase();
  let value = '';
  if (color.length == 7) {
    value = color.slice(1);
  } else if (color.length == 4) {
    value =
      color.slice(1, 2) +
      color.slice(1, 2) +
      color.slice(2, 3) +
      color.slice(2, 3) +
      color.slice(3) +
      color.slice(3);
  } else if (color.length == 3) {
    value =
      color.slice(1, 2) +
      color.slice(1, 2) +
      color.slice(1, 2) +
      color.slice(2, 3) +
      color.slice(2, 3) +
      color.slice(2, 3);
  }
  if (value.length == 6) {
    let red = get16(value.slice(0, 2));
    let green = get16(value.slice(2, 4));
    let blue = get16(value.slice(4, 6));
    return { red, green, blue, result: '#' + value };
  } else {
    return { red: 255, green: 255, blue: 255, result: '#FFFFFF' };
  }
}
function trimStr(str: string) {
  if (str) {
    return str.replace(/\s/g, '');
  }
  return str;
}
export interface ColorResultType {
  red: number;
  green: number;
  blue: number;
  result: string;
  alpha: number;
  rgba: string;
}

//解析颜色
export function getColor(color: string): ColorResultType {
  let red = 255,
    green = 255,
    blue = 255,
    result = '#FFFFFF',
    alpha = 100;
  if (color && typeof color == 'string') {
    if (color.indexOf('rgba(') == 0 && color.match(/(,)/g).length == 3) {
      let value = color.slice(5, color.length - 1).split(',');
      red = parseInt(trimStr(value[0]));
      green = parseInt(trimStr(value[1]));
      blue = parseInt(trimStr(value[2]));
      alpha = parseFloat(trimStr(value[3])) * 100;
      result = '#' + to16(red) + to16(green) + to16(blue);
    } else if (color.indexOf('rgb(') == 0 && color.match(/(,)/g).length == 2) {
      let value = color.slice(4, color.length - 1).split(',');
      red = parseInt(trimStr(value[0]));
      green = parseInt(trimStr(value[1]));
      blue = parseInt(trimStr(value[2]));
      result = '#' + to16(red) + to16(green) + to16(blue);
    } else if (color.indexOf('(') >= 0 && color.indexOf(')') >= 0) {
      let v = color.substring(color.indexOf('(') + 1, color.indexOf(')'));
      let a = v.split(',');
      if (a.length == 3) {
        red = parseInt(trimStr(a[0]));
        green = parseInt(trimStr(a[1]));
        blue = parseInt(trimStr(a[2]));
        result = '#' + to16(red) + to16(green) + to16(blue);
      } else if (a.length == 4) {
        red = parseInt(trimStr(a[0]));
        green = parseInt(trimStr(a[1]));
        blue = parseInt(trimStr(a[2]));
        alpha = parseFloat(trimStr(a[3])) * 100;
        result = '#' + to16(red) + to16(green) + to16(blue);
      }
    } else if (color.indexOf('#') == 0) {
      let r = parseResultColor(color);
      red = r.red;
      green = r.green;
      blue = r.blue;
      result = r.result;
    } else if (color.match(/^[a-zA-Z]+$/)) {
      let c = colorname.find((item) => item.name == color);
      if (c) {
        let r = parseResultColor(c.value);
        red = r.red;
        green = r.green;
        blue = r.blue;
        result = r.result;
      }
    }
  }

  return {
    red,
    green,
    blue,
    result,
    alpha: alpha >= 0 && alpha <= 100 ? alpha : 100,
    rgba: `rgba(${red},${green},${blue},${alpha * 0.01})`
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
