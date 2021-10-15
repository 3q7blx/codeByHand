//对象属性值是“underfined”、任意函数以及symbol值，出现在非数组对象的属性值中时在序列化过程中会被忽略。
//JSON.stringify方法将一个JavaScript对象或值转换为JSON字符串，如果指定一个replace函数，则可以选择性的替换值，或者指定replacer是数组，则可选择性的仅包含数组指定的属性。
// 1、undefined、任意的函数以及symbol值，出现在非数组对象的属性值中时在序列化过程中会被忽略
// 2、undefined、任意的函数以及symbol值出现在数组中时会被转换成 null。
// 3、undefined、任意的函数以及symbol值被单独转换时，会返回 undefined
// 4、所有以symbol为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
//5、NaN 和 Infinity 格式的数值及 null 都会被当做 null。
// 6、转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
// 7、Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
//8、当尝试去转换 BigInt 类型的值会抛出错误
const jsonstringify = (data) => {
  const isCyclic = (obj) => {
    let stackSet = new Set();
    let detected = false;
    const detect = (obj) => {
      if (obj && typeof obj != "object") {
        return;
      }
      if (stackSet.has(obj)) {
        return (detected = true);
      }
      stackSet.add(obj);
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          detect(obj[key]);
        }
      }
      stackSet.delete(obj);
    };
    detect(obj);
    return detected;
  };
  if (isCyclic(data)) {
    throw new TypeError(
      "对包含循环引用的对象（对象之间相互引用，形成无限循环）"
    );
  }
  if (typeof data === "bigint") {
    throw new TypeError("BigInt类型不能转换");
  }
  const type = typeof data;
  const commonKeys1 = ["undefined", "function", "symbol"];
  const getType = (s) => {
    return Object.prototype.toString
      .call(s)
      .replace(/\[object(.*?)\]/, "$1")
      .toLowerCase();
  };
  if(type!='object'||data===null){
      let result = data
      if([NaN,Infinity,null].includes(data)){
          result = 'null'
      }else if(commonKeys1.includes(type)){
          return undefined
      }else if(type === 'string'){
          result = '"'+ data +'"'
      }
      return String(result)
  }else if(type ==='object'){
      if(typeof data.toJSON ==='function'){
          return jsonstringify(data.toJSON)
      }else if(Array.isArray(data)){
          let result = data.map((it)=>{
              return commonKeys1.includes(typeof it) ? 'null' :jsonstringify
          })
          return    `[${result}]`.replace(/'/g,'"')
      }else{
          if(['boolean','number'].includes(getType(data))){
              return String(data)
          }else if(getType(data)==='string'){
              return '"'+data+'"'
          }
      }
  }
};










