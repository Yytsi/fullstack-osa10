import { useMutation } from "@apollo/client";
import { SIGN_USER_IN } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_USER_IN);

  const signIn = async ({ username, password }) => {
    const data = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(data.data.authenticate.accessToken);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
