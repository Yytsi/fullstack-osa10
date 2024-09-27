import { Text, StyleSheet, View, Pressable } from "react-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <AppBar>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              padding: 5,
            }}
          >
            Repositories
          </Text>
        </AppBar>
      </Pressable>

      <RepositoryList />
    </View>
  );
};

export default Main;
