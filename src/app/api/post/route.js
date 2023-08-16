const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request) => {
  const body = await request.json();
  const { title, content, updatedAt, author } = body;
  // console.log("body:>>>",body)

  if (!title) {
    return new NextResponse("제목을 입력하세요.", { status: 400 });
  }

  const post = await prisma.Post.create({
    data: {
      title,
      content,
      updatedAt,
      author ,
    },
  });

  return NextResponse.json(post);
};

export const GET = async (request) => {
  try{
    const posts = await prisma.Post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    // return res.status(200).json(posts);
    return new NextResponse(JSON.stringify(posts), { status: 200 }); // NextResponse 생성자에 body와 options 인자 전달

  }catch(err){
    return new NextResponse("DataBase Error", { status: 500 });
  }
}

