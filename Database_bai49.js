/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách, cho biết thư viện này có hàng trăm giá sách khác nhau, sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới, một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, sách B quá 3 ngày -> tổng 5 ngày
 */
var fs = require('fs');
var readLine = require ('readline-sync');

function showMenu(){
  console.log('\n====HELLO====\n1. Login\n2. Register\n3. Exit');
}

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

function showLogin(){
    do{
        var userName = readLine.question('UserName: ')
        if (userName === '' || findUsername(userName) === undefined){
            console.log("USERNAME INCORRECT, PLEASE TRY AGAIN !!")
        }
    }while(userName === '' || findUsername(userName) === undefined)
    do{
        var passWord = readLine.question('PassWord: ')
        if (passWord === '' || findPassword(findUsername(userName), passWord) === false){
            console.log("PASSWORD INCORRECT, PLEASE TRY AGAIN !!")
        }
    }while(passWord === '' || findPassword(findUsername(userName), passWord) === false)
}

function showRegister(){
    var user = {};
    try {
        var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
        console.log('doc thanh cong')
    } catch (error) {
        fs.writeFileSync('DatabaseUser.json', "[]")
        var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})        
    }
    var parse = JSON.parse(read)

    do{
        var userName = readLine.question('UserName: ')
        if (userName === ''){
            console.log("USERNAME CAN'T NULL, PLEASE TRY AGAIN !!")
        }
    }while(userName === '')
    user.username = userName;
    do{
        var passWord = readLine.question('PassWord: ')
        if (passWord === ''){
            console.log("PASSWORD CAN'T NULL, PLEASE TRY AGAIN !!")
        }
    }while(passWord === '')
    user.password = passWord;
    do{
        var rpassWord = readLine.question('Rewrite PassWord: ')
        if (rpassWord === '' || rpassWord !== passWord){
            console.log("REWRITE PASSWORD MUST SAME PASSWORD !!")
        }
    }while(rpassWord === '' || rpassWord !== passWord)

    
    try {
        console.log(parse)
        parse.push(user);
        var stringify = JSON.stringify(parse);
        console.log('s', stringify)
        fs.writeFileSync('DatabaseUser.json', stringify)
    } catch (error) {
        console.log('loi')
    } 
}

function main(){
    showMenu()
    var choose = readLine.question('>')  
    switch(choose)
    {
        case '1':
            {
                showLogin();
                main()
                break;
            }
        case '2':
            {
                showRegister();
                main()
                break;
            }
        default:
            {
                console.log('GOOD BYE')
                break;
            }
            
    }
}
main();