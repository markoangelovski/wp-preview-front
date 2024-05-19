import { gql } from "@apollo/client";
import { client } from "@/lib/apollo";
import HomeLayout from "@/components/Home/HomeLayout";
import PostLayout from "@/components/Post/PostLayout";
import GqlQuery from "@/components/GqlQuery/GqlQuery";

export default function Home({
  post,
  posts,
  pendingPosts,
  draftPosts,
  gqlQuery
}) {
  if (post)
    return (
      <>
        <PostLayout post={post} />
        <GqlQuery gqlQuery={gqlQuery} />
      </>
    );

  return (
    <>
      <HomeLayout
        draftPosts={draftPosts}
        pendingPosts={pendingPosts}
        posts={posts}
      />
      <GqlQuery gqlQuery={gqlQuery} />
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  // When the post is in Draft or Pending, the Preview button in Wordpress will link to {{host}}/p={{postId}}&preview=true
  const { p, preview } = query;

  if (p) {
    const GET_PENDING_POST_BY_URI = `
      query GetPostByURI($id: ID!, $asPreview: Boolean!) {
        post(id: $id, idType: DATABASE_ID, asPreview: $asPreview) {
          uri
          id
          slug
          status
          title
          content
        }
      }
    `;

    const variables = {
      id: p,
      asPreview: preview === "true"
    };

    const { data } = await client.query({
      query: gql`
        ${GET_PENDING_POST_BY_URI}
      `,
      variables
    });

    if (data?.post)
      return {
        props: {
          post: data.post,
          gqlQuery: { query: GET_PENDING_POST_BY_URI, variables }
        }
      };
  }

  const GET_ALL_POSTS = `
    query GetAllPosts {
      draftPosts: posts(where: { status: DRAFT }) {
        nodes {
          id
          uri
          slug
          status
          title
          content
        }
      }
      pendingPosts: posts(where: { status: PENDING }) {
        nodes {
          id
          uri
          slug
          status
          title
          content
        }
      }
      posts {
        nodes {
          id
          uri
          slug
          status
          title
          content
        }
      }
    }
  `;

  const { data } = await client.query({
    query: gql`
      ${GET_ALL_POSTS}
    `
  });

  return {
    props: {
      draftPosts: data.draftPosts,
      pendingPosts: data.pendingPosts,
      posts: data.posts,
      gqlQuery: { query: GET_ALL_POSTS }
    }
  };
};
