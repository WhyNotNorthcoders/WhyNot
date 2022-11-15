import React from "react";
import { useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import SearchBar from "../components/SearchTabs/SearchBar";
import SearchTopTab from "../components/SearchTabs/SearchTopTab";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchData, setSearchData] = useState([]);

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
        <SearchTopTab />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer:{
    flex: 1,
  },
  topTabContainer: {
    flex:1,
    backgroundColor: "#354F52"
  },
  searchContainer: {
    backgroundColor: "#2F3E46",
    paddingBottom: 1,
  },
  
});

export default Search;
