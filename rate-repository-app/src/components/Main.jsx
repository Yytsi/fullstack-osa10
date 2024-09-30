import { StyleSheet, View, Pressable } from "react-native";
import { Route, Routes, Navigate, Link } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import Text from "./Text";

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
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar>
        <Link to="/" component={Pressable}>
          <Text style={styles.tabLink}>Repositories</Text>
        </Link>
        <Link to="/signin" component={Pressable}>
          <Text style={styles.tabLink}>Sign in</Text>
        </Link>
      </AppBar>
      <Routes>
        {/* Route for the main view */}
        <Route path="/" element={<RepositoryList />} />
        {/* Route for the sign in view */}
        <Route path="/signin" element={<SignIn />} />
        {/* In case of no match, take to main view */}
        <Route path="*" element={<Navigate to="/" />} />{" "}
      </Routes>
    </View>
  );
};

export default Main;
