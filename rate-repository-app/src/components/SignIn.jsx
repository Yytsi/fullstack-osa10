import * as yup from "yup";

import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

import useSignIn from "../hooks/useSignIn";
import Text from "./Text";
import { useNavigate } from "react-router-native";

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

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.signInView}>
      <TextInput
        testID="signInUsernameField"
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
        testID="signInPasswordField"
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
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.signInSubmit}
        testID="signInSubmit"
      >
        <Text style={styles.signInSubmitText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onSubmit(values);
    },
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      if (data) {
        console.log("Sign in was succesful");
        navigate("/");
      }
    } catch (e) {
      console.log("Sign in error: ", e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
