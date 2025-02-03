import * as yup from "yup";

import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { useState } from "react";

import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import Text from "./Text";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
  passwordConfirm: yup
    .string()
    .required("Password confirmation is required")
    .min(5, "Password confirmation must be at least 5 characters")
    .max(50, "Password confirmation must be at most 50 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const styles = StyleSheet.create({
  signUpView: {
    backgroundColor: "white",
    padding: 12,
  },
  signUpTextField: {
    padding: 10,
    borderColor: "grey",
    borderWidth: 0.4,
    borderRadius: 3,
    marginBottom: 15,
  },
  signUpTextFieldError: {
    borderColor: "#d73a4a",
  },
  signUpSubmit: {
    backgroundColor: "#0366d6",
    padding: 15,
    borderRadius: 3,
    alignItems: "center",
  },
  signUpSubmitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export const SignUpContainer = ({ onSubmit, signUpError = null }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.signUpView}>
      <TextInput
        testID="signUpUsernameField"
        style={[
          styles.signUpTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.signUpTextFieldError,
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
        testID="signUpPasswordField"
        blurOnSubmit={false}
        style={[
          styles.signUpTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.signUpTextFieldError,
        ]}
        placeholder="Password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 15 }}>
          {formik.errors.password}{" "}
        </Text>
      ) : null}
      <TextInput
        testID="signUpPasswordConfirmField"
        blurOnSubmit={false}
        style={[
          styles.signUpTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.signUpTextFieldError,
        ]}
        placeholder="Retype password"
        onChangeText={formik.handleChange("passwordConfirm")}
        value={formik.values.passwordConfirm}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 15 }}>
          {formik.errors.passwordConfirm}{" "}
        </Text>
      ) : null}
      {signUpError ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 15 }}>
          {signUpError}{" "}
        </Text>
      ) : null}

      <Pressable
        onPress={formik.handleSubmit}
        style={styles.signUpSubmit}
        testID="signUpSubmit"
      >
        <Text style={styles.signUpSubmitText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp, result] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState(null);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });

      if (data) {
        const signInData = await signIn({ username, password });

        if (signInData) {
          console.log("Sign in was succesful");
          navigate("/");
        }
      }
    } catch (e) {
      setSignUpError(e.message || "An unknown error occurred");
      console.log("Sign up error", e.message || "An unknown error occurred");
    }
  };

  return <SignUpContainer onSubmit={onSubmit} signUpError={signUpError} />;
};

export default SignUp;
