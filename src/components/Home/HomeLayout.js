import React from "react";
import PostCard from "../PostCard/PostCard";
const HomeLayout = ({ pageStgProdPairs }) => {
  return (
    <div className="">
      {pageStgProdPairs.map((pair) => (
        <div key={pair.slug}>
          <div className="grid grid-cols-2 gap-4">
            <p>Staging</p>
            <p>Production</p>
          </div>

          {/* Staging */}
          <div className="grid grid-cols-2 gap-4">
            <PostCard
              ct={{
                slug: pair.slug,
                type: pair.type,
                title: pair.staging.title,
                content: pair.staging.content,
                movieDetails: pair.staging.movieDetails,
                featuredImage: pair.staging.featuredImage,
                raw: pair.raw
              }}
            />

            {/* Production */}
            {pair.visibility && pair.production && (
              <PostCard
                ct={{
                  slug: pair.slug,
                  type: pair.type,
                  title: pair.production.title,
                  content: pair.production.content,
                  movieDetails: pair.production.movieDetails,
                  featuredImage: pair.production.featuredImage,
                  raw: pair.raw
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeLayout;
