import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    const post = await prisma.Post.findUnique({ // prisma.post.findUnique 메소드 사용
      where: { id: parseInt(id) }, // where 옵션 추가
    });
    return new NextResponse(JSON.stringify(post), { status: 200 }); // NextResponse 생성자에 body와 options 인자 전달
  } catch (err) {
    return new NextResponse("DataBase Error", { status: 500 });
  }
};
