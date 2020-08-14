/*
Hãy viết một hàm để kiểm tra xem có thể sắp xếp các kí tự 
của 1 chuỗi String cho trước thành 1 chuỗi String cho trước khác không?

Input: 2 chuỗi String
Output: True hoặc False

ví dụ:

Input: abc cba
Output: True

Input: abx abb
Output: False
*/

function rearrangeChar(str1, str2) {
  var f = 0
  var a = str1.split('')
  a.sort()
  console.log(a)
  var b = str2.split('')
  b.sort()
  console.log(b)
  for (var i = 0; i < a.length; i++){
    if(a[i] !== b[i])
      f++
  }
  if(f !== 0)
    return false
  return true
  
}
rearrangeChar('aafw','afaw') //true



