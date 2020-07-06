function removeEnd(arr, n) {
    arr.splice(arr.length - n, n)
    return arr;
  }
console.log(removeEnd([2, 3, 1, 8, 9, 7], 3))