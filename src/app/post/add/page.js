"use client"
import { useSession } from "next-auth/react";
import React,{useState} from "react";

const PostAdd = () => {
  const [showModal, setShowModal] = useState(true);
  const {data:session,status} = useSession();

  const handleSubmit =async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;


    try{
      const res = await fetch("/api/post",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
            author: {
              connect: { email: session?.user?.email } // 또는 { email: session?.user?.email }
            }
          }),
      })
      if(res.ok){
        const data =await res.text();
        const json = JSON.parse(data);
        alert("추가되었습니다.");
        setShowModal(false);
        window.location.href = "/post";
      }else {
        const errorText = await res.text();
        console.error(errorText)
      }

    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900  "> 글 쓰기</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="제목"
                required
                maxLength="50"
              />
            </div>
            <div>
              <textarea
                type="textarea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg
              focus:ring-blue-500 focus:border-blue-500 h-40 w-full p-2.5 row-span-5 text-start "
                placeholder="내용"
                maxLength="500"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4
                      focus:outline-none focus:ring-blue-300 font-medium founded-lg text-sm px-5 py-2.5 text-center"
            >
              등록하기
            </button>
            
          </form>
        </div>
    </div>
  );
};

export default PostAdd;
