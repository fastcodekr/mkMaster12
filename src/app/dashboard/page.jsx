"use client";

import {  useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  console.log(session,status)


 

  return (
    <div className="flex-1 ">
     <h1 className=" text-2xl text-center my-4">Dashboard</h1>
    {(status !== "authenticated") ? (redirect("/login"))
     :( <div className="flex flex-col justify-center items-center">
        <h3>Hi {session?.user.email}</h3> 
        <div className="mt-10">
          <button  className=" bg-indigo-500 px-4 py-2 rounded text-white hover:bg-indigo-600">현황보기</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Dashboard;