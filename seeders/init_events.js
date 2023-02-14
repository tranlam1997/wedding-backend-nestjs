const {faker} = require('@faker-js/faker')
const crypto = require('crypto')
const fs = require('fs')
// const csvData = res.map(e => {
//     return [e.category_id,
//         e.categoryName ? ("'" + e.categoryName + "'") : 'NULL',
//         e.categoryCode ? ("'" + e.categoryCode + "'") : 'NULL',
//     ]
// })
const csvData = [];
let today = new Date();
for (i = 0; i < 100; i++) {
  const totalEvent = Math.round(Math.random() * 10) ;
  for (j = 0; j < totalEvent; j++) {
    csvData.push([crypto.randomUUID(), `Event ${j}`, faker.random.numeric() , today.getTime(), today.getTime(), j, j, faker.random.numeric() * 1000, ``]);
  }
  today = new Date(today.setDate(today.getDate() - 1));
}
const query =
  'INSERT INTO `Event` (`id`, `title`, `guest_estimate`, `start_time`, `end_time`, `type_id`, `place_id`, `deposit`) VALUES \n' +
  csvData.map((e) => `(${e || 'NULL'})`).join(', \n');
fs.writeFile('category.sql', query, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('success');
});