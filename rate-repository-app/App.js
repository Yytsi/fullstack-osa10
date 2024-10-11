// I use prettier instead of ESLint here; README for more.

import "@expo/metro-runtime"; // Fixed a bug for me

import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

import Constants from "expo-constants";

const App = () => {
  console.log(Constants.expoConfig);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
