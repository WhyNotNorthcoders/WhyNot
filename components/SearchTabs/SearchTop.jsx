import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

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
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#52796F",
  },
  item: {
    textAlign: "center",
    backgroundColor: "#84A98C",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CAD2C5",
    padding: 100,
    fontSize: 20,
    margin: 15,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
});

export default SearchTop;
