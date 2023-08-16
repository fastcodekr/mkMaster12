import Link from "next/link";
import PostList from "./PostList";

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return await res.json(); // await 키워드 추가
  // return data;
}


const Post = async () => {
  const posts =await getData();
  console.log(posts);

  return (
    <div>
      <div>
        <h1 className="text-center text-2xl p-4">게시판</h1>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href={"/post/add"}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              게시글 추가
            </Link>
          </div>
        </div>
        <div className="mt-8 ">
          <table className="min-w-full divide-y divide-gray-400 table-fixed ">
            <thead className="bg-gray-50">
              <tr className="">
                <th className=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  제목
                </th>

                <th className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                  내용
                </th>
                <th className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  작성자
                </th>
                <th className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  최종수정일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <PostList posts={posts}/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Post;
