/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách, cho biết thư viện này có hàng trăm giá sách khác nhau, sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới, một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, sách B quá 3 ngày -> tổng 5 ngày
 */
var fs = require('fs');
var readLine = require ('readline-sync');
var moment = require('moment');
// function findUsername(info){
//   try {
//       var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
//   } catch (error) {
//       fs.writeFileSync('DatabaseUser.json', '[]')      
//       var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})  
//   }
//   var parse = JSON.parse(read);
//   return parse.find(function(x){
//       return x.username === info
//       })
          
// }

// function findPassword(user, info){
//   return user.password === info   
// }
// console.log(findUsername('hoa'))
// console.log(findPassword(findUsername(username), '1999'))
// var read = fs.readFileSync('DatabaseBook.json', {encoding : 'utf8'})
// var readNumber = fs.readFileSync('DatabaseNumber.json', {encoding : 'utf8'})
// var readUser = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
// var parse = JSON.parse(read);
// var parseNumber = JSON.parse(readNumber);
// var parseUser = JSON.parse(readUser);
// console.log('\n====CHOOSE BOOK====');
// for (info of parse){
//     for (infoNumber of parseNumber){
//         if (info.name === infoNumber.name)
//             console.log(info.id, info.name, '\t\tQuantity: ', infoNumber.quantity)
//     }
// }
// var choose = readLine.question('>')
// var chose = parse.find(function(x){
//     return x.id === parseInt(choose)
// })
// var chse = parseNumber.find(function(y){
//     return y.name === chose.name
// })
// var chseU = parseUser.find(function(y){
//     return y.name === chose.name
// })
// console.log(chseU)
// console.log('Ban da muon sach', parse[choose].name, '\t\tSo luong con lai: ', --chse.quantity )
// fs.writeFileSync('DatabaseNumber.json', JSON.stringify(parseNumber))
// function change(username){
//     var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
//     var parse = JSON.parse(read);
//     var changeB = parse.find(function(x){
//         return x.username === username
//     })
//     ++changeB.borrowed
    
//     return fs.writeFileSync('DatabaseUser.json', JSON.stringify(parse))
// }
// change('tam')





console.log(new Date(moment().format('DD/MM/YYYY')).setDate(3))




    