var readlineSync = require('readline-sync');
var fs = require('fs');

    
    try {
        var read = fs.readFileSync('txt.json', {encoding : 'utf-8'});
    } catch (error) {
        fs.writeFileSync('txt.json', "[]")
        var read = fs.readFileSync('txt.json', {encoding : 'utf-8'});
    }

var a = JSON.parse(read)

var arr = [];
function loop(){
    var choose = readlineSync.question('================== \n1. Show all students \n2. Create student \n3. Save & Exit \nYour choice? ')
    switch(choose){
        case '1':
          
                console.log(a);
                return loop();
                
          
        
        case '2':
            {   
                
                var answer = {};
                var name = readlineSync.question('Name?');
                var age = readlineSync.question('Age?');
                var gender = readlineSync.question('Gender(Male/Female)?');
                answer.name = name;
                answer.age = age;
                answer.gender = gender;
                // arr.push(answer); 
                a.push(answer)
                           
                console.log(answer)           
                console.log(a)           
                

                return loop();
            }
        case '3':
            
            var json = JSON.stringify(a)    
            fs.writeFileSync('txt.json', json);
                
            break;
        default:
            console.log('Nhập sai, nhập lại số khác')
            return loop();
}
}
loop();