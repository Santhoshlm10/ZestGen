import valueReducer from "@/app/reducers/categoryReducer";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  let requestBody = await req.json();
  const USERS =  faker.helpers.multiple(prepareGenObject, {
    count: requestBody["count"],
  });
  return NextResponse.json({ message: "post done", data: requestBody, code: 200 });
}

function prepareGenObject() {
  return {
    firstName: valueReducer('faker.person.firstName'),
    lastName: valueReducer('faker.person.lastName'),
  };
}

