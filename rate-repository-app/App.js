// I use prettier instead of ESLint here; README for more.

import "@expo/metro-runtime"; // Fixed a bug for me

import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import createApolloClient from "./src/utils/apolloClient";
const apolloClient = createApolloClient();

import Constants from "expo-constants";

const App = () => {
  console.log(Constants.expoConfig);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
