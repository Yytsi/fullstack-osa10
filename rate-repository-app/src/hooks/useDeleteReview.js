import { useMutation } from "@apollo/client";
import { DELETE_REVIEW_MUTATION } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW_MUTATION);

  const deleteReview = async (id) => {
    try {
      console.log("id", id);
      const response = await mutate({
        variables: { deleteReviewId: id },
      });
      console.log("Got this back", response);
      return { data: response.data };
    } catch (error) {
      console.log("Got this error", error);
      throw error;
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;
