import Post from "../components/Post";

const PostList = ({postList}) => {
  const reversedPostList = postList.slice(0).reverse();
  return (
    <>
    {reversedPostList.map((post, index) => 
                             <Post content={post.content} user={post.user} key={index} updatedAt={post.updatedAt}/>
                           )}
                           </>
  );
}

export default PostList;