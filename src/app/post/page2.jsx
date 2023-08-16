
"use client"
import Link from "next/link";
import PostList from "./PostList";
import {useState,useEffect} from "react";

// /app/post/page.jsx 


// Define an async function to fetch the data 
async function getData(page, size=10) { // Add the page parameter to the API request 
    const res = await fetch(` ${process.env.NEXTAUTH_URL}/api/post?page=${page}&size=${size}`, {
         cache: 'no-store', } ); 
    if (!res.ok) { return null; } // Await the response and return the posts property 
    const data = await res.json(); 
    return data.posts; 
}

// Declare the Post component as an async function
 const Post =  () => { // Use useState hook to store the posts and the current page 
    const [posts, setPosts] = useState([]); 
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});

// Use useEffect hook to fetch the data when the component mounts or the page changes 
useEffect(() => { // Define an async function to get the posts and update the state 
    const getPosts = async () => {
         const data = await getData(page); 
         if (data) { 
            setPosts(data.posts); 
            setPagination(data.pagination);
        } else { console.error('Failed to fetch posts'); 
    } }; // Call the async function getPosts(); 
}, [page]); // Add page as a dependency

// Define a function to handle the page change event 
const handlePageChange = (page) => { // Set the page state to the new page number 
    setPage(page); 
};

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
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              <PostList posts={posts} onPageChange={handlePageChange}  pagination={pagination}/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Post;