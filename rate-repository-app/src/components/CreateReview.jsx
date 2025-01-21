import * as yup from "yup";

import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

import Text from "./Text";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  repositoryRating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  repositoryReview: yup.string().optional(),
});

const styles = StyleSheet.create({
  createReviewView: {
    backgroundColor: "white",
    padding: 12,
  },
  createReviewTextField: {
    padding: 10,
    borderColor: "grey",
    borderWidth: 0.4,
    borderRadius: 3,
    marginBottom: 15,
  },
  ratingError: {
    borderColor: "#d73a4a",
  },
  reviewSubmitButton: {
    backgroundColor: "#0366d6",
    padding: 15,
    borderRadius: 3,
    alignItems: "center",
  },
  createReviewText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  createReviewTextFieldError: {
    borderColor: "#d73a4a",
  },
  createReviewMultilineTextField: {
    padding: 10,
    paddingTop: 10,
    borderColor: "grey",
    borderWidth: 0.4,
    borderRadius: 3,
    marginBottom: 15,
    height: 40,
    // text align center
  },
});

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.createReviewView}>
      <TextInput
        style={[
          styles.createReviewTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.createReviewTextFieldError,
        ]}
        placeholder="Repository owner name"
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
          styles.createReviewTextField,
          formik.touched.username &&
            formik.errors.username &&
            styles.createReviewTextFieldError,
        ]}
        placeholder="Repository name"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 15 }}>
          {formik.errors.password}{" "}
        </Text>
      ) : null}
      <TextInput
        style={[
          styles.createReviewTextField,
          formik.touched.repositoryRating &&
            formik.errors.repositoryRating &&
            styles.ratingError,
        ]}
        placeholder="Rating (0-100)"
        onChangeText={formik.handleChange("repositoryRating")}
        value={formik.values.repositoryRating}
        keyboardType="numeric"
      />
      {formik.touched.repositoryRating && formik.errors.repositoryRating ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 10 }}>
          {formik.errors.repositoryRating}
        </Text>
      ) : null}

      <TextInput
        style={styles.createReviewMultilineTextField}
        placeholder="Review"
        onChangeText={formik.handleChange("repositoryReview")}
        value={formik.values.repositoryReview}
        multiline
      />

      {formik.touched.repositoryReview && formik.errors.repositoryReview ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 10 }}>
          {formik.errors.repositoryReview}
        </Text>
      ) : null}

      <Pressable
        onPress={formik.handleSubmit}
        style={styles.reviewSubmitButton}
      >
        <Text style={styles.createReviewText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const {
      repositoryOwner,
      repositoryName,
      repositoryRating,
      repositoryReview,
    } = values;

    try {
      // will be changed to createReview mutation
      const { data } = await signIn({ username, password });
      if (data) {
        console.log("Sign in was succesful");
        navigate("/");
      }
    } catch (e) {
      console.log("Sign in error: ", e);
    }
  };

  return <CreateReviewContainer onSubmit={handleSubmit} />;
};

export default CreateReview;
