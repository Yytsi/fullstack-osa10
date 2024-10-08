import { useMutation } from "@apollo/client";
import { SIGN_USER_IN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_USER_IN);

  const signIn = async ({ username, password }) => {
    const data = await mutate({
      variables: { credentials: { username, password } },
    });
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
