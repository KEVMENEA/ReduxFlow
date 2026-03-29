import { NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API;

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const res = await fetch(`${baseApi}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          message: data?.message || "Product not updated!",
        },
        { status: res.status }
      );
    }

    return NextResponse.json(
      {
        message: "Product updated successfully!",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Product not updated due to server error!" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const res = await fetch(`${baseApi}/products/${id}`, {
    method: "DELETE",
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: "Deleted successfully" };
  }

  return NextResponse.json(data, { status: res.status });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const res = await fetch(`${baseApi}/products/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}