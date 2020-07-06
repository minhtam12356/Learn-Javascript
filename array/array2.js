function has(object, key) {
   for (var obj in object){
        if (key == obj)
        {
            return true;
            
        }
        return false;}
}
console.log(has({name: "Tom", age: 21}, "name"))