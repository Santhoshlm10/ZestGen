import valueReducer from "@/app/reducers/categoryReducer";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  const requestData = await req.json();
  const USERS =  faker.helpers.multiple(createRandomUser, {
    count: 10000,
  });
  return NextResponse.json({ message: "post done", data: USERS, code: 200 });
}

function createRandomUser() {
  return {
    firstName: valueReducer('FAKER_PERSON_FIRSTNAME'),
    lastName: valueReducer('FAKER_PERSON_LASTNAME'),
    fullName: valueReducer('FAKER_PERSON_FULLNAME'),
    jobArea: valueReducer('FAKER_PERSON_JOBAREA')
  };
}

