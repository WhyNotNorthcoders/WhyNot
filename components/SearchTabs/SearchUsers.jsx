import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const SearchUser = () => {
  const testData = [
    { title: "User1" },
    { title: "User2" },
    { title: "User3" },
    { title: "User4" },
    { title: "User5" },
    { title: "User6" },
    { title: "User7" },
    { title: "User8" },
    { title: "User9" },
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

export default SearchUser;
