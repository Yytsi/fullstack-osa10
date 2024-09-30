import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

import Text from "./Text";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  signInView: {
    backgroundColor: "white",
    padding: 12,
  },
  signInTextField: {
    padding: 10,
    borderColor: "grey",
    borderWidth: 0.4,
    borderRadius: 3,
    marginBottom: 15,
  },
  signInSubmit: {
    backgroundColor: "#0366d6",
    padding: 15,
    borderRadius: 3,
    alignItems: "center",
  },
  signInSubmitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.signInView}>
      <TextInput
        style={styles.signInTextField}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      <TextInput
        style={styles.signInTextField}
        placeholder="Password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit} style={styles.signInSubmit}>
        <Text style={styles.signInSubmitText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
