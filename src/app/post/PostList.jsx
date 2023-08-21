"use client";
import { useRouter } from "next/navigation";
import { sliceStartAtom, sliceEndAtom, currentPageAtom } from "@/storage/atom";
import { useAtom } from "jotai";
import Link from "next/link";

const truncate = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + " ...";
  }
  return str;
};

const PostList = ({ posts }) => {
  // using the global state from Jotai for setting our slice values
  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  // the number that is added to the states specifies how many posts are displayed per page
  const nextPage = () => {
    setCurrentSliceStart(currentSliceStart + 4);
    setCurrentSliceEnd(currentSliceEnd + 4);
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentSliceStart(currentSliceStart - 4);
    setCurrentSliceEnd(currentSliceEnd - 4);
    setCurrentPage(currentPage - 1);
  };

  const router = useRouter();


  return (
    <>
      <div>
        <div className="text-center">
          <h1 className="my-8 p-4 text-3xl">게시판</h1>
        </div>
        <div>
          <button onClick={()=>router.push("/post/add")} className="px-3 py-2 bg-blue-500 text-white rounded my-2 ml-2">게시판추가</button>
        </div>
        <div className=" shadow-lg ">
          <div className="flex justify-between items-center  bg-slate-400  text-white rounded">
            <p className="flex-none w-[350px]   pl-14">제목</p>
            <p className="flex-initial w-[500px] pl-14">내용</p>
            <p className="flex-initial w-[90px]  py-4">작성자</p>
            <p className="flex-initial w-[240px]  p-4">최종수정일</p>
          </div>
          {posts &&
            posts.slice(currentSliceStart, currentSliceEnd).map((post) => (
              <div key={post.id}>
                <Link
                  href={`/post/${post.id}`}
                  className="flex justify-between items-center border-b px-4 py-2 hover:bg-slate-300"
                >
                  <p className="flex-none w-[350px] ">{truncate(post.title,28)}</p>
                  <p className="flex-initial w-[500px]">{truncate(post.content,36)}</p>
                  <p className="flex-initial w-[90px]">{post.author.name}</p>
                  <p className="flex-initial w-[240px]">{post.updatedAt}</p>
                </Link>
              </div>
            ))}

        </div>
        <div className="w-full h-40 mt-12 flex justify-center items-center">
          {currentSliceStart >= 4 && (
            <button onClick={previousPage} className="mr-4 bg-blue-500 text-white px-4 py-2 rounded">previous</button>
          )}
          {posts && currentSliceEnd < posts.length && (
            <button onClick={nextPage} className="bg-blue-500 text-white px-4 py-2 rounded">next</button>
          )}
        </div>

      </div>
    </>
  );
};

export default PostList;
