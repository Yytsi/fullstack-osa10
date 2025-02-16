import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (ordering = "CREATED_AT", searchKeyword = "") => {
  if (ordering.endsWith("_LOW")) {
    ordering = ordering.slice(0, -4);
  }
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy: ordering, searchKeyword },
  });

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
