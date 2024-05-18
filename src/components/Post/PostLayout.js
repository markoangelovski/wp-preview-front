import NotFound from "../NotFound/NotFound";
import PostCard from "../PostCard/PostCard";

const PostLayout = ({ post }) => {
  if (!post) return <NotFound />;

  return (
    <>
      {post.status !== "publish" && (
        <div className="flex justify-center">
          Post status: {post.status === "inherit" ? "preview" : post.status}
        </div>
      )}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PostCard post={post} />
      </div>
    </>
  );
};

export default PostLayout;
