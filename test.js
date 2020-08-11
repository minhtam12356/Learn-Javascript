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

var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})
var parseH = JSON.parse(readH);
var day = parseH[0].expirateDate
var m = moment().format('YYYY/MM/DD')
console.log(m)
var d = new Date(m)
console.log(d.getDate())

// function returned(username){
//    var read = fs.readFileSync('DatabaseNumber.json', {encoding : 'utf8'})
//    var parse = JSON.parse(read);
   
//   var readN = fs.readFileSync('DatabaseNumber.json', {encoding : 'utf8'})
//   var parseN = JSON.parse(readN);
//   var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})
//   var parseH = JSON.parse(readH);
//   console.log('\n====BORROWING BOOK====');
//   for (show of parseH){
//     if (show.username === username){
//       console.log('Borrowing book: ', show.id , show.book, '\tBorrow date: ', show.borrowDate, '\tExpirate Date: ', show.expirateDate)
//     }
//   }
//   var choose = readLine.question('Choose book return > ')
//   var chose = parseH.find(function(x){
//   return x.id === parseInt(choose);})
//   try {
//     console.log('Ban da chon: ', chose.book)
//     parseH.splice(choose, 1)
//     for (show of parseH){
//       if (show.username === username){
//         console.log('Borrowing book: ', show.id , show.book, '\tBorrow date: ', show.borrowDate, '\tExpirate Date: ', show.expirateDate)
//       }
//     }
//   } catch (error) {
//     returned("tam")
  
// }
     

  
 
  
// } returned("tam")  
  // var changeA = parseN.find(function(x){
  //     return x.name
  // })
  // var changeB = parse.find(function(x){
  //     return x.username === username
  // })
  // ++changeB.returned
  