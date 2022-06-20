const fromArrayToObject = (arr, key) => {
    const obj = {}
    for (let elem of arr)
      obj[elem[key]] = elem
  
    return obj
  }

export default fromArrayToObject