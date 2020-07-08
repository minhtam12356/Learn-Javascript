/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var fs = require('fs');
var readLineSync = require('readline-sync');

try {
    var read = fs.readFileSync('Telephone Directory.json', {encoding : "utf-8"});    
} catch (error) {
    fs.writeFileSync('Telephone Directory.json', "[]")
    telephoneDirectory()
    
}
var showData = JSON.parse(read);
function telephoneDirectory()
{
    var choose = readLineSync.question('====================== \n0. Show Data\n1. Add information (name, phone number)\n2. Edit information contact\n3. Delete contact \n4. Find contact \nYour choose: ');
    switch(choose){
        case '0':
            var read = fs.readFileSync('Telephone Directory.json', {encoding : "utf-8"});
            var parse = JSON.parse(read);
            console.log(parse);
            
            break;
        case '1':
            var answer = {};
            answer.name = readLineSync.question('name = ');
            answer.phoneNumber = readLineSync.question('phone number = ');
            showData.push(answer)
            console.log(showData)
            var stringtify = JSON.stringify(showData);
            fs.writeFileSync('Telephone Directory.json', stringtify);
            break;
        case '2':

            var stringtify = JSON.stringify(showData);
            fs.writeFileSync('Telephone Directory.json', stringtify);
            break;
        case '3':
            var ques = readLineSync.question('Input index you want delete: ');      
            showData.splice(ques, 1);
            console.log('Xoá thành công!!')
            var stringtify = JSON.stringify(showData);
            fs.writeFileSync('Telephone Directory.json', stringtify);
            break;
        case '4':
            var ques = readLineSync.question('Input item(name or phone number) you want find: ')
            function findIndex()
            {
                for (show in showData)
                {
                    if (showData[show].name === ques.toLowerCase() || showData[show].phoneNumber === ques)
                        console.log(showData[show]) 
                }
            }
            findIndex();            
            break;
            
    }

    
}
telephoneDirectory();