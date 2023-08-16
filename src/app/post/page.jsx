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
  // console.log(posts);

  return (
    <div>
              <PostList posts={posts}/>
    </div>
  );
};

export default Post;
