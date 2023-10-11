import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log(formData);

  return NextResponse.json({
    message: "Accepted"
  }, {
    status: 200
  });
}