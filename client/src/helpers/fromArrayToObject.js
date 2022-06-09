const fromArrayToObject = (arr, key) => {
    const obj = {}
    for (let elem of arr)
      obj[elem.uid] = elem
  
    return obj
  }

export default fromArrayToObject