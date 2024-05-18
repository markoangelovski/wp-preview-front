import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo";
import HomeLayout from "@/components/Home/HomeLayout";
import PostLayout from "@/components/Post/PostLayout";

export default function Home({ post, posts, pendingPosts, draftPosts }) {
  if (post) return <PostLayout post={post} />;
  return (
    <HomeLayout
      draftPosts={draftPosts}
      pendingPosts={pendingPosts}
      posts={posts}
    />
  );
}

export const getServerSideProps = async ({ query }) => {
  // When the post is in Preview, the Preview button in Wordpress will link to {{host}}/p={{postId}}&preview=true
  const { p, preview } = query;

  if (p) {
    const GET_PENDING_POST_BY_URI = gql`
      query GetPostByURI($id: ID!, $asPreview: Boolean!) {
        post(id: $id, idType: DATABASE_ID, asPreview: $asPreview) {
          uri
          status
          title
          content
        }
      }
    `;

    const { data } = await getClient("auth").query({
      query: GET_PENDING_POST_BY_URI,
      variables: {
        id: p,
        asPreview: preview === "true"
      }
    });

    if (data?.post) return { props: { post: data.post } };
  }

  const GET_DRAFT_POSTS = gql`
    query GetAllPosts {
      posts(where: { status: DRAFT }) {
        nodes {
          uri
          id
          slug
          title
          content
        }
      }
    }
  `;

  const GET_PENDING_POSTS = gql`
    query GetAllPosts {
      posts(where: { status: PENDING }) {
        nodes {
          uri
          id
          slug
          title
          content
        }
      }
    }
  `;

  const GET_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          uri
          id
          slug
          title
          content
        }
      }
    }
  `;

  const [draftPosts, pendingPosts, posts] = await Promise.all([
    getClient("auth").query({
      query: GET_DRAFT_POSTS
    }),
    getClient("auth").query({
      query: GET_PENDING_POSTS
    }),
    getClient().query({
      query: GET_POSTS
    })
  ]);

  return {
    props: {
      posts: posts.data.posts,
      pendingPosts: pendingPosts.data.posts,
      draftPosts: draftPosts.data.posts
    }
  };
};
