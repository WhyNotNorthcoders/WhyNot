import React from "react";
import { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import SearchBar from "../components/SearchTabs/SearchBar";
import SearchTopTab from "../components/SearchTabs/SearchTab";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.searchContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </View>
      <View style={styles.topTabContainer}>
        <SearchTopTab searchPhrase={searchPhrase} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  topTabContainer: {
    flex: 1,
    backgroundColor: "#354F52",
  },
  searchContainer: {
    backgroundColor: "#6667AB",
    paddingBottom: 1,
  },
});

export default Search;
