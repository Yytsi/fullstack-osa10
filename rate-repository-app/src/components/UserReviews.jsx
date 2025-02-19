import { Pressable, View, StyleSheet, FlatList, Alert } from "react-native";

import Text from "./Text";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";

import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER, DELETE_REVIEW_MUTATION } from "../graphql/queries";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  rating: {
    width: 45,
    height: 45,
    borderRadius: 22,
    borderColor: "#0366d6",
    borderWidth: 2,
    paddingTop: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 19,
    fontWeight: "bold",
    color: "#0366d6",
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  rateUser: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewDate: {
    color: "#808080",
  },
  reviewContainer: {
    backgroundColor: "white",
    padding: 15,
  },
  reviewTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  separator: {
    height: 10,
  },
  reviewText: {
    color: "#000",
    marginLeft: 60,
  },
  viewRepositoryText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    margin: 5,
  },
  deleteReviewText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    margin: 5,
  },
  actionsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  viewRepository: {
    backgroundColor: "#0366d6",
    padding: 15,
    borderRadius: 3,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  deleteReview: {
    backgroundColor: "#d73a4a",
    padding: 15,
    borderRadius: 3,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
});

const RepositoryReviewWithActions = ({
  username,
  plainReviewObject,
  refetchReviews = null,
}) => {
  const navigate = useNavigate();
  // I could have also made a RepositoryReview component and used it here
  const review = plainReviewObject.node;
  const trueDate = new Date(review.createdAt);

  const [deleteReview] = useDeleteReview();

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewTop}>
        <Text style={styles.rating}>{review.rating}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.rateUser}>abc</Text>
          <Text style={styles.reviewDate}>
            {format(trueDate, "dd.MM.yyyy")}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      <View style={styles.actionsView}>
        <Pressable
          style={styles.viewRepository}
          onPress={() => {
            navigate(`/${review.repository.id}`);
            console.log("View repository");
          }}
        >
          <Text style={styles.viewRepositoryText}>View repository</Text>
        </Pressable>
        <Pressable
          style={styles.deleteReview}
          onPress={() =>
            Alert.alert(
              "Delete review",
              "Are you sure you want to delete this review?",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: () => {
                    // Delete review
                    deleteReview(review.id);
                    setTimeout(() => refetchReviews(), 600);
                  },
                  style: "destructive",
                },
              ]
            )
          }
        >
          <Text style={styles.deleteReviewText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const UserReviewsContainer = ({ userData, refetchReviews = null }) => {
  return (
    <FlatList
      data={userData?.me?.reviews?.edges || []}
      renderItem={({ item }) => (
        <RepositoryReviewWithActions
          plainReviewObject={item}
          username={userData.me}
          refetchReviews={refetchReviews}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const UserReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <UserReviewsContainer userData={data} refetchReviews={refetch} />;
};

export default UserReviews;
