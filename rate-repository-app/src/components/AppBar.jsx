import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    paddingBottom: 10,
    flexDirection: "row",
  },
});

const AppBar = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>{children}</ScrollView>
    </View>
  );
};

export default AppBar;
