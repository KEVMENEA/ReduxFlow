import { NextResponse } from "next/server";
import { Params } from "zod/v4/core";

const baseApi = process.env.NEXT_PUBLIC_API;

type RouteContext = {
  params: {
    id: string;
  };
};


export async function GET() {
  const res = await fetch(`${baseApi}/products`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${baseApi}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

