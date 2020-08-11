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
const { memory } = require('console');

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
    try {
        var read = fs.readFileSync('DatabaseBook.json', {encoding : 'utf8'})
    } catch (error) {
        var data = JSON.stringify([
            { id: 0, name: 'Tay du ky' },
             { id: 1, name: 'Nhat ky cua be' },
             { id: 2, name: 'Robinson' },
             { id: 3, name: 'Tieng anh' }
            ])
        fs.writeFileSync('DatabaseBook.json', data)      
        var read = fs.readFileSync('DatabaseBook.json', {encoding : 'utf8'})  
    }
    var parse = JSON.parse(read);
    try {
        var readNumber = fs.readFileSync('DatabaseNumber.json', {encoding : 'utf8'})
    } catch (error) {
        var dataN = JSON.stringify([
            { name: 'Nhat ky cua be', numberOfShelves: 1, quantity: 10 },
             { name: 'Tay du ky', numberOfShelves: 0, quantity: 11 },
             { name: 'Robinson', numberOfShelves: 2, quantity: 12 },
             { name: 'Tieng anh', numberOfShelves: 3, quantity: 13 }
            ])
        fs.writeFileSync('DatabaseNumber.json', dataN)      
        var readNumber = fs.readFileSync('DatabaseNumber.json', {encoding : 'utf8'})  
    }
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

    //create borrow
    var borrow = {};
    try {
        var readB = fs.readFileSync('DatabaseBorrow.json', {encoding : 'utf8'})
    } catch (error) {
        fs.writeFileSync('DatabaseBorrow.json', "[]")
        var readB = fs.readFileSync('DatabaseBorrow.json', {encoding : 'utf8'})        
    }
    var parseB = JSON.parse(readB)
    var newDate = new Date();
    newDate.setDate(newDate.getDate() - 2)
    borrow.id = parseB.length;
    borrow.username = userName;
    borrow.book = parse[choose].name;
    borrow.borrowDate = moment().format('YYYY/MM/DD');
    borrow.expirateDate = moment(newDate).format('YYYY/MM/DD');
    borrow.returnDate = "Unpaid";
    parseB.push(borrow);
    var stringifyB = JSON.stringify(parseB);      
    fs.writeFileSync('DatabaseBorrow.json', stringifyB)

    //create history borrow
    var history = {};
    try {
        var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})
    } catch (error) {
        fs.writeFileSync('DatabaseHistory.json', "[]")
        var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})        
    }
    var parseH = JSON.parse(readH)
    
    

    history.id = parseH.length;
    history.username = userName;
    history.book = parse[choose].name;
    history.borrowDate = moment().format('YYYY/MM/DD');
    history.expirateDate = moment(newDate).format('YYYY/MM/DD');
    history.returnDate = "Unpaid";
    history.outOfDate = "0"
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
                returned(userName);
                decreBorrow(userName);
                showHomePage(userName);
                break;
            } 
        case '3':
            {
                history(userName);
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
    ++changeB.returned
    
    return fs.writeFileSync('DatabaseUser.json', JSON.stringify(parse))
}

function returned(username){ 
    var newDate = new Date();
    var readN = fs.readFileSync('DatabaseNumber.json', {encoding : 'utf8'})
    var parseN = JSON.parse(readN);

    var readB = fs.readFileSync('DatabaseBorrow.json', {encoding : 'utf8'})
    var parseB = JSON.parse(readB);

    var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})
    var parseH = JSON.parse(readH);
    console.log('\n====BORROWING BOOK====');
    for (show of parseB){
        if (show.username === username){
        console.log('Borrowing book: ', show.id , show.book, '\tBorrow Date: ', show.borrowDate, '\tExpirate Date: ', show.expirateDate)
        }
    }
    
    var choose = readLine.question('Choose book return > ')
    var chose = parseB.find(function(x){
        return x.id === parseInt(choose);    
    })
    var choseN = parseN.find(function(x){
        return x.name === chose.book; 
    })
    var choseH = parseH.find(function(x){
        return x.book === chose.book && x.username === chose.username && x.expirateDate === chose.expirateDate && x.returnDate === chose.returnDate;
    })
    
        console.log('Return Success: ',chose.id, chose.book)
        parseB.splice(parseB.indexOf(chose), 1)
        fs.writeFileSync('DatabaseBorrow.json', JSON.stringify(parseB))
        ++choseN.quantity
        fs.writeFileSync('DatabaseNumber.json', JSON.stringify(parseN))
        choseH.returnDate = moment(newDate).format('YYYY/MM/DD');
        var reDate = new Date(choseH.returnDate)
        var exDate = new Date(choseH.expirateDate)
        if((reDate.getDate() - exDate.getDate()) > 0){
            choseH.outOfDate = reDate.getDate() - exDate.getDate();
        }
        
        fs.writeFileSync('DatabaseHistory.json', JSON.stringify(parseH))
            
}

function history(username){
    var readH = fs.readFileSync('DatabaseHistory.json', {encoding : 'utf8'})
    var parseH = JSON.parse(readH);
    var sum = 0;
    console.log('\n====HISTORY BORROW BOOK====');
    for (show of parseH){
        
        if (show.username === username){
            console.log(show.id , show.book, '\tBorrow Date: ', show.borrowDate, '\tExpirate Date: ', show.expirateDate, '\tReturn Date: ', show.returnDate, '\tOut Of Date: ', show.outOfDate)
            sum = show.outOfDate + sum;            
        }
    }
    console.log('Sum out of date: ', sum)   
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