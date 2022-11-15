import { View, Text, StyleSheet, FlatList } from "react-native";

const SearchEvent = () => {
  const testData = [
    { title: "Event1" },
    { title: "Event2" },
    { title: "Event3" },
    { title: "Event4" },
    { title: "Event5" },
    { title: "Event6" },
    { title: "Event7" },
    { title: "Event8" },
    { title: "Event9" },
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
    backgroundColor: "#f9f9f9",
  },
  item: {
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    padding: 100,
    fontSize: 20,
  },
});

export default SearchEvent;