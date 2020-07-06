/**
 * 1. Sử dụng module fs để đọc file `data.json`
 * 2. Dùng JSON.parse để chuyển đổi string đọc được ở bước 1 sang Object
 * 3. Log property `name` từ object ở bước 2
 * 4. Thêm 1 property `members` là một array, truyền vào 1 object mô tả về bạn
 * 5. Ghi lại dữ liệu vào file data.json
 * 6. Mở file data.json để kiểm chứng xem bạn làm đúng không
 */
var fs = require('fs');
/*1.*/readJSON = fs.readFileSync('./package.json', {encoding : 'utf8'});
/*2.*/parseJSON = JSON.parse(readJSON);
/*3.*/console.log(parseJSON.name)
/*4.*/parseJSON.members = [{name : 'tam', age : 21}];
/*5.*/stringifyJSON = JSON.stringify(parseJSON);
      writeJSON = fs.writeFileSync('./package.json', stringifyJSON);
/*6.*/console.log(stringifyJSON)
