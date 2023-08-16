"use client"
import Link from 'next/link';
import React from 'react'

const PostModal = ({showModal,onClose,children}) => {
    if (!showModal) return null;

    // const handleClose=(e)=>{
    //   if(e.target.id === 'wrapper') onClose();
    // }
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        // id="wrapper"
        // onClick={handleClose}
      >
        <div className=" md:w-[600px] w-[90%] mx-auto flex flex-col ">
          <Link
            className=" text-xl text-white place-self-end p-2 hover:text-red-500"
            href={"/post"}
          >
            X
          </Link>
          <div className="bg-white p-2 rounded">{children}</div>
        </div>
      </div>
    );
  };

export default PostModal