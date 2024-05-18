import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo";
import PostLayout from "@/components/Post/PostLayout";

export default function Post({ post }) {
  return <PostLayout post={post} />;
}

export const getServerSideProps = async ({ params, query }) => {
  const { uri } = params;
  const { preview, preview_id } = query;

  const GET_POST_BY_URI = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        uri
        slug
        status
      }
    }
  `;

  const GET_PREVIEW_POST_BY_URI = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: DATABASE_ID, asPreview: true) {
        title
        content
        uri
        slug
        status
      }
    }
  `;

  const isPreview = preview === "true" && preview_id;
  const isPending = preview === "true";

  const gqlQuery = isPreview ? GET_PREVIEW_POST_BY_URI : GET_POST_BY_URI;
  const id = isPreview ? preview_id : uri;

  const { data } = await getClient((isPreview || isPending) && "auth").query({
    query: gqlQuery,
    variables: {
      id
    }
  });

  return { props: { post: data.post } };
};
