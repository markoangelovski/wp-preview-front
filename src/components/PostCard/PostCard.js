import Accordion from "../Accordion/Accordion";

const PostCard = ({ ct }) => {
  return (
    <div className="rounded-lg  py-6 pr-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
      <h5 className="mb-2 text-xl font-medium leading-tight">
        Slug: {ct.slug}
      </h5>
      <h5 className="mb-2 text-xl font-medium leading-tight">
        Type: {ct.type}
      </h5>
      <h6 className="mb-2 text-xl font-medium leading-tight">
        Title: {ct.title}
      </h6>
      <div
        className="mb-4 text-base"
        dangerouslySetInnerHTML={{ __html: ct.content }}
      ></div>
      {ct.movieDetails && (
        <>
          <h6 className="mb-2 text-xl font-medium leading-tight">
            Movie title: {ct.movieDetails.title}
          </h6>
          <div className="flex">
            <img
              style={{
                width: ct.featuredImage.node.mediaDetails.width / 4,
                height: ct.featuredImage.node.mediaDetails.height / 4
              }}
              src={ct.featuredImage.node.link}
              className="mr-4"
            />
            <p className="mb-4 text-base">{ct.movieDetails.excerpt}</p>
          </div>
        </>
      )}
      <Accordion payload={ct.raw} />
    </div>
  );
};

export default PostCard;
