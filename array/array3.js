function sum(numbers) {
    var sum = 0;
    for (var number of numbers)
    {
        if (number == null)
                return 0;
        sum += number;
    }
return sum;
}
console.log(sum([]))