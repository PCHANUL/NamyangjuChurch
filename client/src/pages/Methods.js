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