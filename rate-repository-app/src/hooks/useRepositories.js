import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (
  ordering = "CREATED_AT",
  searchKeyword = "",
  first = 3,
  after = ""
) => {
  if (ordering.endsWith("_LOW")) {
    ordering = ordering.slice(0, -4);
  }
  const { data, loading, fetchMore, error, refetch } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables: { orderBy: ordering, searchKeyword, first, after },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log(
      "Fetching more repositories, with ",
      data.repositories.pageInfo.endCursor
    );

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy: ordering,
        searchKeyword,
        first,
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
