var users = [
  { 
      name: 'Thinh', 
      phone: '070123123'
  },
  {
      name: 'Hung',
      phone: '080456456'
  },
  {
      name: 'Hoang',
      phone: '090123123'
  }
  ];
var c = users.filter(item => item.phone === '070123123')
console.log(c)