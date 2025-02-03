import { useMutation } from "@apollo/client";
import { SIGN_USER_IN } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_USER_IN);

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: { credentials: { username, password } },
      });
      await authStorage.setAccessToken(response.data.authenticate.accessToken);
      apolloClient.resetStore();
      return { data: response.data };
    } catch (error) {
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
