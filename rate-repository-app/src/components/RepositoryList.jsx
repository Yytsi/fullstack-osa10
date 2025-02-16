import { FlatList, View, StyleSheet, Pressable } from "react-native";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Text from "./Text";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  orderToggle: {
    color: "black",
    fontSize: 16,
    padding: 15,
    paddingLeft: 20,
  },
  picker: {
    marginTop: -40,
    marginBottom: -40,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedOrdering = "CREATED_AT",
  changeOrdering = () => null,
  backwards = false,
}) => {
  const navigate = useNavigate();
  const [pickerVisible, setPickerVisible] = useState(false);
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  if (backwards) {
    repositoryNodes.reverse();
  }

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <>
          <Pressable onPress={() => setPickerVisible(!pickerVisible)}>
            <Text style={styles.orderToggle}>
              Select a way to order repositories {"▼▲"[pickerVisible ? 1 : 0]}
            </Text>
          </Pressable>
          {pickerVisible && (
            <Picker
              selectedValue={selectedOrdering}
              onValueChange={(itemValue, itemIndex) => {
                changeOrdering(itemValue);
                setTimeout(() => setPickerVisible(false), 200);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Latest repositories" value="CREATED_AT" />
              <Picker.Item label="Highest rating" value="RATING_AVERAGE" />
              <Picker.Item label="Lowest rating" value="RATING_AVERAGE_LOW" />
            </Picker>
          )}
        </>
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem repository={item} isSingleItem={false} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState("CREATED_AT");
  const { repositories } = useRepositories(selectedOrdering);

  const changeOrdering = (ordering) => {
    setSelectedOrdering(ordering);
  };

  return (
    <RepositoryListContainer
      selectedOrdering={selectedOrdering}
      changeOrdering={changeOrdering}
      repositories={repositories}
      backwards={selectedOrdering.endsWith("_LOW")}
    />
  );
};

export default RepositoryList;
