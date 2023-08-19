import PostDetail from "./PostDetail";

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
  const post = await getData(params.id);
  console.log('post>>>>',post)

  return (
    <div className="w-[1000px] mx-auto">
      PostIdPage{params.id}
      <div className="mt-10 text-center py-6 px-6 lg:px-8 ">
        <h3 className="mb-4 text-xl font-medium text-gray-900  ">
          {params.id} 글 내용보기
        </h3>
        <PostDetail post={post} />
      </div>
    </div>
  );
};

export default BlogPost;
