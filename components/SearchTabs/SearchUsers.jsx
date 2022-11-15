import { View, Text, StyleSheet, FlatList } from "react-native";

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
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#D3D3D3",
  },
  item: {
    textAlign: "center",
    backgroundColor: "#D3D3D3",
    padding: 100,
    fontSize: 20,
  },
});

export default SearchUser;
