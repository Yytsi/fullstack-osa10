import * as yup from "yup";

import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

import usesignUp from "../hooks/useSignIn";
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

export const SignUpContainer = ({ onSubmit }) => {
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
        style={[
          styles.signUpTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.signUpTextFieldError,
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
        style={styles.signUpSubmit}
        testID="signUpSubmit"
      >
        <Text style={styles.signUpSubmitText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = usesignUp();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      if (data) {
        console.log("Sign up was succesful");
        navigate("/");
      }
    } catch (e) {
      console.log("Sign up error: ", e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
