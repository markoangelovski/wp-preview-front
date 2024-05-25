import { gql } from "@apollo/client";
import { client } from "@/lib/apollo";
import HomeLayout from "@/components/Home/HomeLayout";
import GqlQuery from "@/components/GqlQuery/GqlQuery";

export default function Home({ pageStgProdPairs, gqlQuery }) {
  return (
    <>
      <HomeLayout pageStgProdPairs={pageStgProdPairs} />
      <GqlQuery gqlQuery={gqlQuery} />
    </>
  );
}

export const getServerSideProps = async () => {
  const GET_ALL_CTS = `
    query GetAllCTs {
      posts {
        nodes {
          slug
          contentTypeName
          pageVisibility {
            displayOnLive
          }
          revisions {
            nodes {
              pageStatus {
                pageStatus
              }
              title
              content
            }
          }
        }
      }
      pages {
        nodes {
          slug
          contentTypeName
          pageVisibility {
            displayOnLive
          }
          revisions {
            nodes {
              pageStatus {
                pageStatus
              }
              title
              content
            }
          }
        }
      }
      movies {
        nodes {
          slug
          contentTypeName
          pageVisibility {
            displayOnLive
          }
          revisions {
            nodes {
              pageStatus {
                pageStatus
              }
              title
              movieDetails {
                title
                excerpt
              }
              featuredImage {
                node {
                  link
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: gql`
      ${GET_ALL_CTS}
    `
  });

  const pageStgProdPairs = [];

  [...data.posts.nodes, ...data.pages.nodes, ...data.movies.nodes].forEach(
    (ct) => {
      const stgCt = ct.revisions.nodes.find(
        (node) => node.pageStatus.pageStatus[0] === "staging"
      );
      const prodCt = ct.revisions.nodes.find(
        (node) => node.pageStatus.pageStatus[0] === "production"
      );

      pageStgProdPairs.push({
        slug: ct.slug,
        type: ct.contentTypeName,
        visibility: ct.pageVisibility.displayOnLive,
        staging: stgCt,
        production: ct.pageVisibility.displayOnLive && prodCt ? prodCt : null,
        raw: ct
      });
    }
  );

  return {
    props: {
      pageStgProdPairs,
      gqlQuery: { query: GET_ALL_CTS }
    }
  };
};
