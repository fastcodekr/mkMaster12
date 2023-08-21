"use client"
import PostList from "./PostList";
import {useEffect,useState} from "react";

const Post = () => {
  const [posts,setPosts] = useState([])  

  useEffect(() => {
    // 비동기 함수 정의
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/post`);
        // 응답 상태 코드 확인
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log(res)
        setPosts(await res.json());
      } catch (err) {
        // 오류 처리
        console.error(err);
      }
    }
    // 비동기 함수 호출
    fetchData();
  }, []); // 의존성 배열 빈 배열로 설정



  return (
    <div>
              <PostList posts={posts}/>
    </div>
  );
};

export default Post;
