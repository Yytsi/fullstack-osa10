import { StyleSheet, View, Pressable } from "react-native";
import { Route, Routes, Navigate, Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import Text from "./Text";
import useAuthStorage from "../hooks/useApolloClient";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";

import { GET_AUTHENTICATION_INFORMATION } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
  tabLink: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const Main = () => {
  // useQuery hook to get user
  const { data, loading, error } = useQuery(GET_AUTHENTICATION_INFORMATION);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <AppBar>
        <Link to="/" component={Pressable}>
          <Text style={styles.tabLink}>Repositories</Text>
        </Link>
        <Link to="/create_review" component={Pressable}>
          <Text style={styles.tabLink}>Create a review</Text>
        </Link>
        {data?.me?.username == null ? (
          <Link to="/signin" component={Pressable}>
            <Text style={styles.tabLink}>Sign in</Text>
          </Link>
        ) : (
          <Link
            to="/"
            component={Pressable}
            onPress={async () => {
              await authStorage.removeAccessToken();
              await apolloClient.resetStore();
              console.log("User has logged out");
            }}
          >
            <Text style={styles.tabLink}>Sign out</Text>
          </Link>
        )}
      </AppBar>
      <Routes>
        {/* Route for the main view */}
        <Route path="/" element={<RepositoryList />} />
        <Route path="/create_review" element={<CreateReview />} />
        {/* Route for the sign in view */}
        <Route path="/signin" element={<SignIn />} />
        {/* Route for the single repository view */}
        <Route path="/:id" element={<SingleRepository />} />
        {/* In case of no match, take to main view */}
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>
    </View>
  );
};

export default Main;
