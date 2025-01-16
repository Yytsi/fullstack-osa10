import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

import Text from "./Text";

const RepositoryItem = ({ repo, showGithubButton = false }) => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    skip: !!repo,
  });

  const repository = repo || data?.repository;

  if (!repository || loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const roundNumber = (number) =>
    number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.innerRow}>
        <Image
          style={styles.image}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.midTextElement,
              { fontWeight: "bold", fontSize: 18 },
            ]}
          >
            {repository.fullName}
          </Text>
          <Text
            style={[
              styles.midTextElement,
              {
                color: "#404040",
                fontSize: 15,
              },
            ]}
            testID="repositoryItemDescription"
          >
            {repository.description}
          </Text>
          <Text
            style={[
              styles.midTextElement,
              {
                backgroundColor: "#0366d6",
                color: "white",
                padding: 5,
                alignSelf: "flex-start",
                borderRadius: 5,
              },
            ]}
          >
            {repository.language}
          </Text>
        </View>
      </View>

      <View style={styles.statisticsBox}>
        <View style={styles.statisticsItem}>
          <Text style={styles.valueForLabel}>
            {roundNumber(repository.stargazersCount)}
          </Text>
          <Text style={styles.label}>Stars</Text>
        </View>
        <View style={styles.statisticsItem}>
          <Text style={styles.valueForLabel}>
            {roundNumber(repository.forksCount)}
          </Text>
          <Text style={styles.label}>Forks</Text>
        </View>
        <View style={styles.statisticsItem}>
          <Text style={styles.valueForLabel}>
            {roundNumber(repository.reviewCount)}
          </Text>
          <Text style={styles.label}>Reviews</Text>
        </View>
        <View style={styles.statisticsItem}>
          <Text style={styles.valueForLabel}>
            {roundNumber(repository.ratingAverage)}
          </Text>
          <Text style={styles.label}>Rating</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {showGithubButton && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(repository.url)}
          >
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    backgroundColor: "white",
  },
  innerRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  midTextElement: {
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "start",
    paddingLeft: 10,
  },
  statisticsBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 15,
  },
  statisticsItem: {
    margin: 5,
    flexDirection: "column",
  },
  valueForLabel: {
    fontWeight: "bold",
    marginBottom: 7,
    textAlign: "center",
  },
  label: {
    color: "#606060",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RepositoryItem;
