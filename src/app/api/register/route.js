const { PrismaClient } = require("@prisma/client");
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export const POST =async(request)=>{
    const body = await request.json();
    const {name,email,password,createdAt} = body;
    console.log("body:>>>",body)

    if(!name || !email || !password){
        return new NextResponse("Data가 잘못되었습니다.",{status:400})
    }
    const exist = await prisma.User.findUnique({
        where:{
            email:email,
        }
    });

    if(exist){
        return new NextResponse("User가 이미 존재합니다.",{status:400})
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    const user = await prisma.User.create({
        data:{
            name,
            email,
            createdAt,
            // mobile,
            password:hashedpassword,
            
        }
    })

    return NextResponse.json(user)



}