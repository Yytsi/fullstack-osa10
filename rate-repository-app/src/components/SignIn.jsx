import * as yup from "yup";

import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

import Text from "./Text";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

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
  signInTextFieldError: {
    borderColor: "#d73a4a",
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
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.signInView}>
      <TextInput
        style={[
          styles.signInTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.signInTextFieldError,
        ]}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 10 }}>
          {formik.errors.username}{" "}
        </Text>
      ) : null}
      <TextInput
        style={[
          styles.signInTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.signInTextFieldError,
        ]}
        placeholder="Password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 15 }}>
          {formik.errors.password}{" "}
        </Text>
      ) : null}
      <Pressable onPress={formik.handleSubmit} style={styles.signInSubmit}>
        <Text style={styles.signInSubmitText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
