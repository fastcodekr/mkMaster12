// /api/post/route.js import { PrismaClient } from “@prisma/client”; import { NextResponse } from “next/server”;

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request) => {
  const body = await request.json();
  const { title, content, updatedAt, author } = body;
  // console.log(“body:>>>”,body)

  if (!title) {
    return new NextResponse("제목을 입력하세요.", { status: 400 });
  }

  const post = await prisma.Post.create({
    data: { title, content, updatedAt, author },
  });

  return NextResponse.json(post);
};

export const GET = async (request) => {
  // Get the page number and size from the query params
  const page = parseInt(request.query.page) || 1; // Default to page 1
  const size = parseInt(request.query.size) || 10; // Default to size 10

  // Get all posts from the database with pagination
  const posts = await prisma.Post.findMany({
    include: { author: true },
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * size, // How many rows to skip
    take: size, // How many rows to take
  });

  // Get the total number of posts from the database
  const count = await prisma.Post.count();
  count = parseInt(count);

  // Return the posts and the pagination info as JSON response
  return NextResponse.json({
    posts,
    pagination: { page, size, total: count, lastPage: Math.ceil(count / size) },
  });
};
