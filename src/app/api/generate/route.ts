import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';


export async function POST(req: any, res: any) {
  const requestData = await req.json();
  let temp = []
  for (let index = 0; index <= 100000; index++) {
    temp.push({name:faker.animal.cat()})
  }
  return NextResponse.json({ message: 'post done', data: temp,code:200 });
}
