import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

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

export default SearchEvent;
