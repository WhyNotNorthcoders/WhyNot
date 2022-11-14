import React from "react";
import { useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import SearchBar from "./SearchBar";
import SearchTopTab from "./SearchTopTab";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchData, setSearchData] = useState({});

  const testData = [
    { title: "item1" },
    { title: "item2" },
    { title: "item3" },
    { title: "item4" },
    { title: "item5" },
    { title: "item6" },
    { title: "item7" },
    { title: "item8" },
    { title: "item9" },
  ];

  return (
    <SafeAreaView>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View>
        <SearchTopTab />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={testData}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignContent: "center",
  },
  item: {
    textAlign: "center",
    backgroundColor: "gray",
    padding: 50,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Search;
