import valueReducer from "@/app/reducers/categoryReducer";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  try {
    let requestBody = await req.json();
    const generatedResponse =  faker.helpers.multiple(() => prepareGenObject(requestBody["data"]), {
      count: requestBody["count"],
    });
    return NextResponse.json({ success:true, data: generatedResponse }); 
  } catch (error:any) {
    return NextResponse.json({ success:false, data: error.message }); 
  }
}

function prepareGenObject(data:any) {
  let filObj:any = {}
  let keys = Object.keys(data);
  keys.map((item:string) =>{
    filObj[item] = valueReducer(data[item])
  })
  return filObj;
}

