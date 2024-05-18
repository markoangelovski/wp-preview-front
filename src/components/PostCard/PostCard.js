import React from "react";

const PostCard = ({ post }) => {
  console.log("post_ ", post);
  return (
    <a
      key={post.uri}
      href={post.uri}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {post.title}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <div
        className={`m-0 max-w-[30ch] text-sm opacity-50`}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className={`m-0 max-w-[30ch] text-sm`}>URI: {post.uri}</div>
      <div className={`m-0 max-w-[30ch] text-sm`}>slug: {post.slug}</div>
    </a>
  );
};

export default PostCard;
