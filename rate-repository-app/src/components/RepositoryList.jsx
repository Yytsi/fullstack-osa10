import { FlatList, View, StyleSheet, Pressable } from "react-native";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Text from "./Text";

import RepositoryItem from "./RepositoryItem";
import { TextInput } from "react-native";

import { useDebounce } from "use-debounce";

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
  searchKeywordField: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedOrdering = "CREATED_AT",
  changeOrdering = () => null,
  changeKeyword = () => null,
  backwards = false,
  onEndReach = () => null,
}) => {
  const navigate = useNavigate();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
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
          <TextInput
            testID="searchKeywordField"
            style={[styles.searchKeywordField]}
            placeholder="Search keyword"
            onChangeText={(text) => {
              setSearchKeyword(text);
              changeKeyword(text);
            }}
            autoCapitalize="none"
            value={searchKeyword}
          />
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
      initialNumToRender={repositoryNodes.length}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState("CREATED_AT");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(selectedOrdering, debouncedKeyword);

  const changeOrdering = (ordering) => {
    setSelectedOrdering(ordering);
  };

  const changeKeyword = (text) => {
    setSearchKeyword(text);
  };

  return (
    <RepositoryListContainer
      selectedOrdering={selectedOrdering}
      changeOrdering={changeOrdering}
      changeKeyword={changeKeyword}
      repositories={repositories}
      backwards={selectedOrdering.endsWith("_LOW")}
      onEndReach={() => console.log("End reached!")}
    />
  );
};

export default RepositoryList;
