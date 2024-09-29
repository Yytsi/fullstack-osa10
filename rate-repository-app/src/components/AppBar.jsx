import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    height: theme.appBar.height,
    flexDirection: "row",
  },
});

const AppBar = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default AppBar;
