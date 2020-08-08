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

function showMenu(){
  console.log('\n====WELCOME TO LIBRARY====\n1. Login\n2. Register\n3. Exit');
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



function showRegister(){
    //create user
    var user = {};
    try {
        var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
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
    user.borrowed = "0";
    user.returned = "0";
    user.sumOutOfDate = "0";
       
    parse.push(user);
    var stringify = JSON.stringify(parse);      
    fs.writeFileSync('DatabaseUser.json', stringify)

    
    
}

function borrowBook(userName){
    var read = fs.readFileSync('DatabaseBook.json', {encoding : 'utf8'})
    var parse = JSON.parse(read);
    var readNumber = fs.readFileSync('DatabaseNumber.json', {encoding : 'utf8'})
    var parseNumber = JSON.parse(readNumber);
    console.log('\n====CHOOSE BOOK====');
    for (info of parse){
        for (infoNumber of parseNumber){
            if (info.name === infoNumber.name)
                console.log(info.id, info.name, '\t\tQuantity: ', infoNumber.quantity)
        }
    }
    var choose = readLine.question('Choose ID >')
    var chose = parse.find(function(x){
        return x.id === parseInt(choose)
    })
    var chse = parseNumber.find(function(y){
        return y.name === chose.name
    })

    console.log('Ban da muon sach', parse[choose].name, '\t\tSo luong con lai: ', --chse.quantity )  
    fs.writeFileSync('DatabaseNumber.json', JSON.stringify(parseNumber))

    //create history borrow
    var history = {};
    try {
        var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})
    } catch (error) {
        fs.writeFileSync('DatabaseHistory.json', "[]")
        var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})        
    }
    var parseH = JSON.parse(readH)
    var newDate = new Date(moment().format('DD/MM/YYYY'));
    newDate.setDate(newDate.getDate() + 15)
    history.username = userName;
    history.book = parse[choose].name;
    history.borrowDate = moment().format('DD/MM/YYYY');
    history.expirateDate = moment(newDate).format('DD/MM/YYYY');
    history.returnDate = "Unpaid";
    parseH.push(history);
    var stringifyH = JSON.stringify(parseH);      
    fs.writeFileSync('DatabaseHistory.json', stringifyH)
}

function showHomePage(userName){
    console.log('\n====HELLO====\n1. Borrow Book\n2. Return Book\n3. History\n4. Logout');
    var choose = readLine.question('>')
    switch(choose)
    {       
        case '1':
            {
                borrowBook(userName);
                increBorrow(userName);
                showHomePage(userName);       
                break;
            }
        case '2':
            {

                decreBorrow(userName);
                returned(userName);
                showHomePage(userName);
                break;
            } 
        default:
        {
            console.log('CANCEL')
            break;
        }            
    }
}

function increBorrow(username){
    var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
    var parse = JSON.parse(read);
    var changeB = parse.find(function(x){
        return x.username === username
    })
    ++changeB.borrowed
    
    return fs.writeFileSync('DatabaseUser.json', JSON.stringify(parse))
}

function decreBorrow(username){
    var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
    var parse = JSON.parse(read);
    var changeB = parse.find(function(x){
        return x.username === username
    })
    --changeB.borrowed
    
    return fs.writeFileSync('DatabaseUser.json', JSON.stringify(parse))
}

function returned(username){
    var read = fs.readFileSync('DatabaseUser.json', {encoding : 'utf8'})
    var parse = JSON.parse(read);
    var changeB = parse.find(function(x){
        return x.username === username
    })
    ++changeB.returned
    
    return fs.writeFileSync('DatabaseUser.json', JSON.stringify(parse))
}

function main(){
    showMenu()
    var choose = readLine.question('>')  
    switch(choose)
    {
        case '1':
            { 
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
                
                showHomePage(userName);
                
                main();
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