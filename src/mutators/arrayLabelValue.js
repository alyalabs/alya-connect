export default function (obj, key) {
  if (Array.isArray(obj[key]) && obj[key].length > 0) {
    if (obj[key][0]['label'] && obj[key][0]['value']) {
      const newArr = []

      for (const item of obj[key]) {
        if (item.label) {
          newArr.push(item.value)
        }
      }

      obj[key] = newArr
    }
  }
}