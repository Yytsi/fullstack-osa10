import { FlatList, View, StyleSheet, Pressable } from "react-native";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  backwards = false,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  if (backwards) {
    repositoryNodes.reverse();
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem repository={item} isSingleItem={false} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = ({ ordering = "CREATED_AT" }) => {
  const { repositories } = useRepositories(ordering);

  return (
    <RepositoryListContainer
      repositories={repositories}
      backwards={ordering.endsWith("_LOW")}
    />
  );
};

export default RepositoryList;
