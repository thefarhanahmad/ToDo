import dbConnect from "@/config/dbConnect";
import Todo from "@/models/route";
import { NextResponse } from "next/server";

// FUNCTION TO MAKE POST REQ API

export async function POST(req, res) {
  try {
    // fteching body from req. json
    const body = await req.json();
    await dbConnect();

    // create userdata and insert in db
    await Todo.create(body);

    // return data in response
    return NextResponse.json(
      {
        success: true,
        message: "todo addedd successfully !",
        body: body,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "server error,fix it",
      },
      {
        status: 400,
      }
    );
  }
}

// FUNCTION TO MAKE GET API
export async function GET(request) {
  try {
    await dbConnect();
    const body = await Todo.find();
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(
      {
        message: "server error,fix it",
      },
      {
        status: 400,
      }
    );
  }
}

// function to delete todo
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await dbConnect();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "server error,fix it",
      },
      {
        status: 400,
      }
    );
  }
}
