import { View, StyleSheet, FlatList } from "react-native";

import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";

import { GET_REPOSITORY } from "../graphql/queries";

import Text from "./Text";

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

const RepositoryReview = ({ plainReviewObject }) => {
  const review = plainReviewObject.node;
  const trueDate = new Date(review.createdAt);
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewTop}>
        <Text style={styles.rating}>{review.rating}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.rateUser}>{review.user.username}</Text>
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

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading, fetchMore, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id, first: 8, after: "" },
  });

  const repository = data?.repository;

  const handleFetchMore = () => {
    console.log("Fetching more repositories", data.repository.reviews.pageInfo);
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log(
      "Fetching more reviews, with ",
      data.repository.reviews.pageInfo.endCursor
    );

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: 8,
      },
    });
  };

  if (!repository || loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message + ""}</Text>;

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <RepositoryReview plainReviewObject={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem repository={repository} isSingleItem />
          <ItemSeparator />
        </>
      )}
      onEndReached={() => {
        console.log("You've reached the end of the reviews list");
        handleFetchMore();
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
