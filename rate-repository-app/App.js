// I use prettier instead of ESLint here; README for more.

import "@expo/metro-runtime"; // Fixed a bug for me

import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";

const App = () => {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
};

export default App;
