import { faker } from "@faker-js/faker";

const valueReducer = (type: string) => {
  switch (type) {
    //person module
    case "faker.person.bio":
      return faker.person.bio();
    case "faker.person.firstname":
      return faker.person.firstName();
    case "faker.person.fullName":
      return faker.person.fullName();
    case "faker.person.gender":
      return faker.person.gender();
    case "faker.person.jobArea":
      return faker.person.jobArea();
    case "faker.person.jobDescriptor":
      return faker.person.jobDescriptor();
    case "faker.person.jobTitle":
      return faker.person.jobTitle();
    case "faker.person.jobType":
      return faker.person.jobType();
    case "faker.person.lastName":
      return faker.person.lastName();
    case "faker.person.middleName":
      return faker.person.middleName();
    case "faker.person.prefix":
      return faker.person.prefix();
    case "faker.person.sex":
      return faker.person.sex();
    case "faker.person.sexType":
      return faker.person.sexType();
    case "faker.person.suffix":
      return faker.person.suffix();
    case "faker.person.zodiacSign":
      return faker.person.zodiacSign();
    default:
      return "Data not found";
  }
};
export default valueReducer;
