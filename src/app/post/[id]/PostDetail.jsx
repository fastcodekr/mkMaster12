"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const PostDetail = ({ post }) => {
  const router = useRouter();

  const handleDelete=async(post)=>{
    console.log('delete clicked')
    const confirmed = confirm("Are you sure you want to delete this post?")
    if(confirmed){
      try{
        await fetch(`/api/post/${post.id}`,{
          method: "DELETE",
        });
        router.back();
      }catch(err){
        console.log(err);
      }
    }
  }


  return (
    <>
      <div className="">
        {post ? ( // 삼항 연산자 사용
          // 즉시 실행 함수 대신에 JSX 요소를 괄호로 감싼 코드
          <div className="flex flex-col gap-4">
            <p
              className="bg-gray-50 border border-gray-300 text-gray-900 text-left text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {post.title}
            </p>
            <p
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg
              focus:ring-blue-500 focus:border-blue-500 h-40 w-full p-2.5 row-span-5 text-start "
            >
              {post.content}
            </p>
          </div>
        ) : (
          // data가 null일 때 처리할 코드
          <p>데이터가 없습니다.</p>
        )}

        <div className="flex gap-20 justify-center mt-6 ">
          <button
            type="submit"
            className=" w-fit text-white bg-blue-500 hover:bg-blue-700 focus:ring-4
                      focus:outline-none focus:ring-blue-300 font-medium founded-lg text-sm px-5 py-2.5 text-center rounded"
          >
            수정하기
          </button>
          <button
            onClick={()=>{handleDelete(post)}}
            type="submit"
            className=" w-fit text-white bg-red-500 hover:bg-red-700 focus:ring-4
                      focus:outline-none focus:ring-blue-300 font-medium founded-lg text-sm px-5 py-2.5 text-center rounded"
          >
            삭제하기
          </button>
          <Link
            href={"/post"}
            className="w-fit text-white bg-blue-500 hover:bg-blue-700 focus:ring-4
                      focus:outline-none focus:ring-blue-300 font-medium founded-lg text-sm px-5 py-2.5 text-center rounded"
          >
            목록 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
