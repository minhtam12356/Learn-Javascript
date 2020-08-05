var fs = require('fs');
var readLine = require ('readline-sync');
function findUsername(info){
  try {
      var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
  } catch (error) {
      fs.writeFileSync('DatabaseUser.json', '[]')      
      var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})  
  }
  var parse = JSON.parse(read);
  return parse.find(function(x){
      return x.username === info
      })
          
}

function findPassword(user, info){
  return user.password === info   
}
console.log(findUsername('hoa'))
console.log(findPassword(findUsername(username), '1999'))