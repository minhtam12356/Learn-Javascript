var apartment = {
    bedroom: {
      area: 20,
      bed: {
        type: 'twin-bed',
        price: 100
      }
    }
  };
  var arr = []                          
  function getObjectKey(obj) {
      
      for (var keys in obj)
      {
        console.log(typeof obj[keys])
        arr.push(keys);

        if (typeof obj[keys] == 'object'){
            getObjectKey(obj[keys])
            }
      }
    return arr;
    
  }
  console.log(getObjectKey(apartment))