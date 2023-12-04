
export const getNum = (num: number) => {
  return new Map([
    [900,  getNum900],
    [901,  getNum901],
    [902,  getNum902],
    [903,  getNum903],
    [904,  getNum904],
    [100,  getNum100],
    [101,  getNum901],
    [102,  getNum102],
    [103,  getNum103],
    [104,  getNum104],
    [105,  getNum105],
    [200,  getNum200],
    [201,  getNum201],
    [202,  getNum202],
    [203,  getNum203],
    [204,  getNum204],
    [300,  getNum300],
    [301,  getNum301],
  ]).get(num)();
}
// 十位＋十位
export const getNum900 = () => {
  // 生成10到99之间的随机整数，十位数为1~9，个位数为0~9
  const num1: number = Math.floor(Math.random() * 90 + 10);
  //  生成10到99之间的随机整数，十位数为1~9，个位数为0~9
  const num2: number = Math.floor(Math.random() * 90 + 10);
  return { num1, num2 };
}

// 十位 - 十位
export const getNum901 = () => {
  // 生成10到99之间的随机整数，十位数为1~9，个位数为0~9
  const num1 = Math.floor(Math.random() * 90 + 10);
  // 生成10到num1-1之间的随机整数
  const num2 = Math.floor(Math.random() * (num1 - 10) + 10);
  return { num1, num2 };
}

// 百位 + 百位
export const getNum902 = () => {
  // 生成100到999之间的随机整数，百位数为1~9， 十位数为1~9，个位数为0~9,
  const num1 = Math.floor(Math.random() * 900 + 100);
  //  生成100到999之间的随机整数，百位数为1~9，十位数为1~9，个位数为0~9
  const num2 = Math.floor(Math.random() * 900 + 100);
  return { num1, num2 };
}

// 百位 - 百位
export const getNum903 = () => {
  // 生成100到999之间的随机整数，百位数为1~9，十位数为1~9，个位数为0~9
  const num1 = Math.floor(Math.random() * 900 + 100);
  // 生成10到num1-1之间的随机整数
  const num2 = Math.floor(Math.random() * (num1 - 100) + 100);
  return { num1, num2 };
}

// 十位 × 个位
export const getNum904 = () => {
  // 生成10到99之间的随机整数，十位数为1~9，个位数为0~9
  const num1 = Math.floor(Math.random() * 90 + 10);
  //  生成1到9之间的随机整数
  const num2 = Math.floor(Math.random() * 9 + 1);
  return { num1, num2 };
}

// 1*×1*
export const getNum100 = () => {
  return {
    num1: 10 + Math.floor(Math.random() * 10),
    num2: 10 + Math.floor(Math.random() * 10)
  };
}

// 9*×9*
export const getNum101 = () => {
  return {
    num1: 90 + Math.floor(Math.random() * 10),
    num2: 90 + Math.floor(Math.random() * 10)
  };
}

// *5×*5
export const getNum102 = () => {
  return {
    num1: Math.ceil(Math.random() * 1000000000 % 9) * 10 + 5,
    num2: Math.ceil(Math.random() * 1000000000 % 9) * 10 + 5,
  };
}

// mn×(10-m)n
export const getNum103 = () => {
  const ones = Math.ceil(Math.random() * 1000000000 % 9);
  const place = Math.ceil(Math.random() * 1000000000 % 9);
  return {
    num1: place * 10 + ones,
    num2: (10 - place) * 10 + ones
  };
}

// mn×m(10-n)
export const getNum104 = () => {
  const ones = Math.ceil(Math.random() * 1000000000 % 9);
  const place = Math.ceil(Math.random() * 1000000000 % 9);
  return {
    num1: place * 10 + ones,
    num2: place * 10 + (10 - ones)
  };
}

// m(10-m)×nn
export const getNum105 = () => {
  const first = Math.ceil(Math.random() * 1000000000 % 9);
  const second = Math.ceil(Math.random() * 1000000000 % 9);
  return {
    num1: first * 10 + (10 - first),
    num2: second * 10 + second
  };
}

// 分母特殊
export const getNum200 = () => {
  // 生成100到999之间的随机整数，百位数为1~9，十位数为1~9，个位数为0~9
  const num1 = Math.floor(Math.random() * 900 + 100);
  const arr = [50, 5, 333, 25, 250, 20, 200, 167, 143, 125, 111];
  // const float = Math.floor(Math.random() * 3) - 1;
  const num2 = arr[Math.floor(Math.random() * arr.length)];
  return { num1, num2 };
}

// 分母 9×n
export const getNum201 = () => {
  const num1 = Math.floor(Math.random() * 900 + 100);
  const float = Math.floor(Math.random() * 9 + 1);
  const num2 = 9 * float;
  return { num1, num2 };
}

// 百位/10n
export const getNum202 = () => {
   // 生成100到999之间的随机整数，百位数为1~9，十位数为1~9，个位数为0~9
   const num1 = Math.floor(Math.random() * 900 + 100);
   const num2 = Math.floor(Math.random() * 9 + 101);
   return { num1, num2 };
}

// 百位/111
export const getNum203 = () => {
  const num1 = Math.floor(Math.random() * 900 + 100);
  const num2 = Math.floor(Math.random() * 13) + 105;
  return { num1, num2 };
}

// 百位/百位
export const getNum204 = () => {
  const num1 = Math.floor(Math.random() * 900 + 100);
  const num2 = Math.floor(Math.random() * 900 + 100);
  return { num1, num2 };
}

// 平方数
export const getNum300 = () => {
  // 生成10到99之间的随机整数，十位数为1~9，个位数为0~9
  const num1 = Math.floor(Math.random() * 90 + 10);
  return { num1, num2: num1 };
}

// 百化分
export const getNum301 = () => {
  const arr = [50, 33.3, 25, 20, 16.7, 14.3, 12.5, 11.1, 10, 9.1, 8.3, 7.7, 7.1, 6.7, 6.3, 5.9, 5.6, 5.3];
  const num2 = Math.floor(Math.random() * arr.length);
  const num1 = arr[num2];
  return { num1, num2: num2 + 2};
}