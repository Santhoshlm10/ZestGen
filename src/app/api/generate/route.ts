import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    let requestBody = await req.json();
    const generatedResponse =  faker.helpers.multiple(() => prepareGenObject(requestBody["data"],faker), {
      count: requestBody["count"],
    });
    return NextResponse.json({ success:true, data: generatedResponse }); 
  } catch (error:any) {
    return NextResponse.json({ success:false, data: error.message }); 
  }
}

function prepareGenObject(data:any,fakerInstace:any) {
  // I dont undertand... if i did not include the fakerInstance here, the program gives me
  // error that "faker is not defined"
  // fix this incase if anybody has better solution

  // the faker var declared below is simply not used anywhere 😕
  var faker = fakerInstace;
  let filObj:any = {}
  let keys = Object.keys(data);
  keys.map((item:string) =>{
    filObj[item] = eval(data[item])
  })
  return filObj;
}

