import { Pressable, View, StyleSheet, FlatList } from "react-native";

import Text from "./Text";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";

import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

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
});

const RepositoryReview = ({ username, plainReviewObject }) => {
  const review = plainReviewObject.node;
  const trueDate = new Date(review.createdAt);
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
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const UserReviewsContainer = ({ userData }) => {
  return (
    <FlatList
      data={userData?.me?.reviews?.edges || []}
      renderItem={({ item }) => (
        <RepositoryReview plainReviewObject={item} username={userData.me} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const UserReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <UserReviewsContainer userData={data} />;
};

export default UserReviews;
