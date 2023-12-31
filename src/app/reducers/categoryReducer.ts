import { faker } from "@faker-js/faker";

const valueReducer = (type:string) => {
    switch (type) {
        case 'FAKER_PERSON_FIRSTNAME':
            return faker.person.firstName()
        case 'FAKER_PERSON_LASTNAME':
            return faker.person.lastName()
        case 'FAKER_PERSON_FULLNAME':
            return faker.person.jobDescriptor()
        case 'FAKER_PERSON_JOBAREA':
            return faker.person.jobArea();
        default:
            return ''
    }
}
export default valueReducer;