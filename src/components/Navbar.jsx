"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="h-8 flex justify-between items-center gap-8  p-6 border-b-2 ">
        <h1
          className="font-bold text-2xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          CORETEST2
        </h1>
        <ul className="flex gap-8 items-center">
          <li className="px-3 py-2 rounded hover:bg-indigo-500 hover:text-white ">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="px-3 py-2 rounded hover:bg-indigo-500 hover:text-white ">
            <Link href={"/editor"}>Editor</Link>
          </li>
          <li className="px-3 py-2 rounded hover:bg-indigo-500 hover:text-white ">
            <Link href={"/post"}>Post</Link>
          </li>
          <li className="px-3 py-2 rounded hover:bg-indigo-500 hover:text-white ">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="px-3 py-2 rounded hover:bg-indigo-500 hover:text-white ">
            <Link href={"/user"}>사용자관리</Link>
          </li>
        </ul>
        {/* <div className=" flex gap-8 justify-end">
          <button className="px-3 py-2 rounded hover:bg-indigo-500 hover:text-white ">
            login
          </button>
          <button
            className="px-3 py-2 rounded hover:bg-indigo-500 hover:text-white "
            onClick={() => router.push("/register")}
          >
            register
          </button>
        </div> */}
        <div className="flex-end flex gap-8">
          {status === "authenticated" ? (
            <div className="flex items-center">
              <p className="text-indigo-500 hover:underline">{session?.user.name}</p>
              <button
                className="py-2 px-3 rounded hover:bg-indigo-500 hover:text-white ml-2"
                onClick={() => signOut()}
              >
                logout
              </button>
            </div>
          ) : (
            <div>
              <button
                className="py-2 px-3 rounded hover:bg-indigo-500 hover:text-white"
                onClick={() => router.push("/login")}
              >
                login
              </button>
              <button
                className="py-2 px-3 rounded hover:bg-indigo-500 hover:text-white"
                onClick={() => router.push("/register")}
              >
                register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
