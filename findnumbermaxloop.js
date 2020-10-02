function findMostFrequent(arr) {
  var d = []
  var a = arr.reduce(function(current, item){
    if (current[item]){
      current[item]++
    }
    else{
      current[item] = 1
    }
    return current
  }, {})
  
  var m = 0
  for (b in a){       
    if (a[b] > m){
      m = a[b]
    }      
  }

  for (c in a){
    if (a[c] === m){
      d.push(parseInt(c))
    }    
  } 
  console.log(a,m, d)
}
findMostFrequent([1,1,2,3,1,3,3,1])
