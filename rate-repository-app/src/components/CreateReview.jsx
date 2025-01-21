import * as yup from "yup";

import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";

import Text from "./Text";
import { useNavigate } from "react-router-native";

import { useMutation } from "@apollo/client";
import { CREATE_REVIEW_MUTATION } from "../graphql/queries";

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
  },
});

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      repositoryOwner: "",
      repositoryName: "",
      repositoryRating: "",
      repositoryReview: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.createReviewView}>
      <TextInput
        style={[
          styles.createReviewTextField,
          formik.touched.repositoryOwner &&
            formik.errors.repositoryOwner &&
            styles.createReviewTextFieldError,
        ]}
        placeholder="Repository owner name"
        onChangeText={formik.handleChange("repositoryOwner")}
        value={formik.values.repositoryOwner}
      />
      {formik.touched.repositoryOwner && formik.errors.repositoryOwner ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 10 }}>
          {formik.errors.repositoryOwner}{" "}
        </Text>
      ) : null}
      <TextInput
        style={[
          styles.createReviewTextField,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.createReviewTextFieldError,
        ]}
        placeholder="Repository name"
        onChangeText={formik.handleChange("repositoryName")}
        value={formik.values.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName ? (
        <Text style={{ color: "red", marginTop: -10, marginBottom: 15 }}>
          {formik.errors.repositoryName}{" "}
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
  const [createReview, { isLoading, isError, mutate }] = useMutation(
    CREATE_REVIEW_MUTATION
  );

  const handleSubmit = async (values) => {
    const {
      repositoryOwner,
      repositoryName,
      repositoryRating,
      repositoryReview,
    } = values;

    try {
      const response = await createReview({
        variables: {
          review: {
            ownerName: repositoryOwner,
            repositoryName: repositoryName,
            rating: parseInt(repositoryRating),
            text: repositoryReview,
          },
        },
      });

      navigate(`/${response.data.createReview.repositoryId}`);
    } catch (e) {
      console.error("Error creating review: ", e);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return <CreateReviewContainer onSubmit={handleSubmit} />;
};

export default CreateReview;
