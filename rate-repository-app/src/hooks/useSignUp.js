import { useMutation } from "@apollo/client";
import { SIGN_USER_UP } from "../graphql/queries";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_USER_UP);

  const signUp = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: { user: { username, password } },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return [signUp, result];
};

export default useSignUp;
