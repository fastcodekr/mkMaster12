import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    const post = await prisma.Post.findUnique({
      // prisma.post.findUnique 메소드 사용
      where: { id: parseInt(id) }, // where 옵션 추가
    });
    return new NextResponse(JSON.stringify(post), { status: 200 }); // NextResponse 생성자에 body와 options 인자 전달
  } catch (err) {
    return new NextResponse("DataBase Error", { status: 500 });
  }
};

export const DELETE = async (req,{params}) => {
  const  {id}  = params; // id 값 가져오기
  console.log("ID...>>>",id)

  try {
    const post = await prisma.Post.findUnique({
      where:{
        id:parseInt(id),
      },
      include:{
        author:true,
      },
    })

    await prisma.Post.delete({
      where:{
        id:parseInt(id),
      },
    })

   return new NextResponse(JSON.stringify({message:"Post deleted successfully"},{status:200} ));

  } catch (error) {
    console.error(error);

  }
};