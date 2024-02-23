// ESM
const { faker } =  require('@faker-js/faker');

 function createRandomUser() {
  return {
    C1: faker.airline.aircraftType(),
    C2: faker.airline.airline()["name"],
    C21: faker.airline.airline()["iataCode"],
    C3: faker.airline.airplane()["name"],
    C31: faker.airline.airplane()["iataTypeCode"],
    C4: faker.airline.airport()["name"],
    C41: faker.airline.airport()["iataCode"],
    C5: faker.airline.flightNumber(),
    C6: faker.airline.recordLocator(),
    C7: faker.airline.seat()
  };
}

 const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
console.log("UserData",USERS)
