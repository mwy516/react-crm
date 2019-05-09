/* eslint-disable */
export const timeStampToString = (time) => {
  const datetime = new Date()
  datetime.setTime(time)
  const year = datetime.getFullYear()
  const month = datetime.getMonth() + 1
  const date = datetime.getDate()
  const hour = datetime.getHours() >= 10 ? datetime.getHours() : `0${datetime.getHours()}`
  const minute = datetime.getMinutes() >= 10 ? datetime.getMinutes() : `0${datetime.getMinutes()}`
  const second = datetime.getSeconds() >= 10 ? datetime.getSeconds() : `0${datetime.getSeconds()}`
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

export const log = (b = 'this id',a) => {
  console.log(`${b}%c${a}`, 'background: #222; color: #bada55')
}

export const isObjectValueEqual = (a, b) => {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
