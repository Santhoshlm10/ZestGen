// ESM
const { faker } =  require('@faker-js/faker');

//  function createRandomUser() {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// }

//  const USERS = faker.helpers.multiple(createRandomUser, {
//   count: 5,
// });
// console.log("UserData",USERS)

const data = 
{
    "Column0": "faker.airline.aircraftType()",
    "Column1": "faker.airline.aircraftType()"
}
let t = {}
for(const key in data){
    t[key] = eval(data[key])
}
console.log(t)
