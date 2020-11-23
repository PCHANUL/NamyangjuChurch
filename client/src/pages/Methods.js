export const transDate = (date) => {
  let rawDate = new Date(JSON.parse(date));
  let year = rawDate.getFullYear();
  let month = rawDate.getMonth() + 1;
  let day = rawDate.getDate();
  
  return `${year}. ${month}. ${day}`
}

export const isEmptyObject = async (param) => {
  console.log('param: ', await param);
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export const betweenTwoStr = (string, target1, target2, result = [], start = 0) => {
  if (string.indexOf(target1, start) !== -1) {
    let t1 = string.indexOf(target1, start);
    let t2 = string.indexOf(target2, t1 + 1);
    result.push(string.substring(t1 + 1, t2).trim());
    return betweenTwoStr(string, target1, target2, result, t2 + 1);
  } else {
    return result;
  }
}

export const isSameArr = (obj, prevObj) => {
  let objKeys = Object.keys(obj)
  let prevObjKeys = Object.keys(prevObj)
  
  if (objKeys.length !== prevObjKeys.length) return false;
  for (let i = 0; i < objKeys.length; i++) {
    if (obj[objKeys[i]] !== prevObj[prevObjKeys[i]]) return false;
  }
  return true;
}