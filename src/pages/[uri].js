import { gql } from "@apollo/client";
import { client, getClient } from "@/lib/apollo";
import PostLayout from "@/components/Post/PostLayout";
import GqlQuery from "@/components/GqlQuery/GqlQuery";

export default function Post({ post, gqlQuery }) {
  return (
    <>
      <PostLayout post={post} />
      <GqlQuery gqlQuery={gqlQuery} />
    </>
  );
}

export const getServerSideProps = async ({ params, query }) => {
  const { uri } = params;
  const { preview, preview_id } = query;

  const GET_POST_BY_URI = `
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        uri
        id
        slug
        status
        title
        content
      }
    }
  `;

  const GET_PREVIEW_POST_BY_URI = `
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: DATABASE_ID, asPreview: true) {
        uri
        id
        slug
        status
        title
        content
      }
    }
  `;

  const isPreview = preview === "true" && preview_id;
  const isPending = preview === "true";

  const gqlQuery = isPreview ? GET_PREVIEW_POST_BY_URI : GET_POST_BY_URI;
  const id = isPreview ? preview_id : uri;

  const variables = {
    id
  };

  const { data } = await client.query({
    query: gql`
      ${gqlQuery}
    `,
    variables
  });

  return {
    props: { post: data.post, gqlQuery: { query: gqlQuery, variables } }
  };
};
