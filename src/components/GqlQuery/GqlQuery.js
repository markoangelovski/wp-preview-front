import React from "react";

const GqlQuery = ({ gqlQuery }) => {
  const { query, variables } = gqlQuery;
  return (
    <div className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      {variables && (
        <div>
          Variables:{" "}
          {Object.keys(variables).map(
            (variable) => `${variable}: ${variables[variable]}, `
          )}
        </div>
      )}
      <pre>{query}</pre>
    </div>
  );
};

export default GqlQuery;
