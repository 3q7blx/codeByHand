//instanceOf运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
const instanceOf1 = (obj, func) => {
  if (obj === null || typeof obj != "object") {
    return false;
  }
  let proto = Object.getPrototypeOf(obj);
  if (proto === func.prototype) {
    return true;
  } else if (proto === null) {
    return false;
  } else {
    return instanceOf1(proto, func);
  }
};

const instanceOf2 = (obj, func) => {
  if (obj === null || typeof obj != "object") {
    return false;
  }
  let proto = obj;
  while ((proto = Object.getPrototypeOf(proto))) {
    if (proto === null) {
      return false;
    } else if (proto === func.prototype) {
      return true;
    }
  }
  return false;
};

const instanceOf3 = (obj, func) => {
  if (obj === null || typeof obj != "object") {
    return false;
  }
  let proto = obj;
  while (true) {
    if (proto === null) {
      return false;
    } else if (proto === func.prototype) {
      return true;
    } else {
      proto = Object.getPrototypeOf(proto);
    }
  }
};






















