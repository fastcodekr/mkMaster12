import Link from "next/link";

async function getData(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return await res.json(); // await 키워드 추가
  // return data;
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  // console.log(data)

  return (
    <div className="w-[1000px] mx-auto">
      PostIdPage{params.id}
      <div className="py-6 px-6 lg:px-8 text-left">
        <h3 className="mb-4 text-xl font-medium text-gray-900  ">
          {params.id} 글 내용보기
        </h3>
        <div className="">
          {data ? ( // 삼항 연산자 사용
            // 즉시 실행 함수 대신에 JSX 요소를 괄호로 감싼 코드
            (
              <div className="flex flex-col gap-4" >
                <p
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  {data.title}
                </p>
                <p
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg
              focus:ring-blue-500 focus:border-blue-500 h-40 w-full p-2.5 row-span-5 text-start "
                >
                  {data.content}
                </p>
              </div>
            )
          ) : (
            // data가 null일 때 처리할 코드
            <p>데이터가 없습니다.</p>
          )}

          <div className="flex gap-40 justify-center mt-6 ">
            <button
              type="submit"
              className=" w-fit text-white bg-blue-500 hover:bg-blue-700 focus:ring-4
                      focus:outline-none focus:ring-blue-300 font-medium founded-lg text-sm px-5 py-2.5 text-center rounded"
            >
              수정하기
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
      </div>
    </div>
  );
};

export default BlogPost;
