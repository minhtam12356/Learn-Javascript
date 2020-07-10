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
    var read = fs.readFileSync('Telephone Directory.json', {encoding : "utf8"});    
} catch (error) {
    fs.writeFileSync('Telephone Directory.json', "[]")
    telephoneDirectory()
    
}
var showData = JSON.parse(read);
function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}
function telephoneDirectory()
{
    
    var choose = readLineSync.question('====================== \n0. Xem dữ liệu\n1. Add information (name, phone number)\n2. Edit information contact\n3. Delete contact \n4. Find contact\n5. Exit \nYour choose: ', );
    switch(choose){
        case '0':
            var read = fs.readFileSync('Telephone Directory.json', {encoding : "utf8"});
            var parse = JSON.parse(read);
            console.log(parse);
            
            telephoneDirectory();
            break;
        case '1':
            var answer = {};
            answer.name = readLineSync.question('name = ');
            answer.phoneNumber = readLineSync.question('phone number = ');
            showData.push(answer)
            console.log(showData)
            var stringtify = JSON.stringify(showData);
            fs.writeFileSync('Telephone Directory.json', stringtify);
            telephoneDirectory();
            break;

        case '2':
            var edit = readLineSync.question('Enter name you want edit: ')
            function editData()
            {
                for (show in showData)
                {
                    if (change_alias(showData[show].name) === change_alias(edit))
                    {
                        console.log(showData[show]) 
                        var editName = readLineSync.question('Enter new name = ')
                        var editNumberPhone = readLineSync.question('Enter new numberphone = ')
                        showData[show].name = editName;
                        showData[show].phoneNumber = editNumberPhone; 
                        console.log(showData[show])
                    }
                        
                }
            }
            editData(); 
            var stringtify = JSON.stringify(showData);
            fs.writeFileSync('Telephone Directory.json', stringtify);
            telephoneDirectory();
            break;
        case '3':
            var ques = readLineSync.question('Input index you want delete: ');      
            showData.splice(ques, 1);
            console.log('Xoá thành công!!')
            var stringtify = JSON.stringify(showData);
            fs.writeFileSync('Telephone Directory.json', stringtify);
            telephoneDirectory();
            break;
        case '4':
            var ques = readLineSync.question('Input item(name or phone number) you want find: ')
            function findIndex()
            {
                for (show in showData)
                {
                    if ((change_alias(showData[show].name)).includes(change_alias(ques)) || (showData[show].phoneNumber).includes(ques))
                        console.log(showData[show]) 
                }
            }
            findIndex();            
            telephoneDirectory();
            break;
        default:
            break;

            
    }

    
}
telephoneDirectory();