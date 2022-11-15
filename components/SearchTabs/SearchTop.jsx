import { View, Text, StyleSheet, FlatList } from "react-native";

const SearchTop = () => {
  const testData = [
    { title: "Top1" },
    { title: "Top2" },
    { title: "Top3" },
    { title: "Top4" },
    { title: "Top5" },
    { title: "Top6" },
    { title: "Top7" },
    { title: "Top8" },
    { title: "Top9" },
  ];

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={testData}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "silver",
  },
  item: {
    textAlign: "center",
    backgroundColor: "#c0c0c0",
    padding: 100,
    fontSize: 20,
  },
});

export default SearchTop;
