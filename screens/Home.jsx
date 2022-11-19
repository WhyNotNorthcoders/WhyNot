import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { collection, documentId, getDocs } from "firebase/firestore";
import { database } from "../config/firebaseConfig";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const Home = () => {
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.titles}>{item.title}</Text>
      <Text style={styles.text}>Category{item.category}</Text>
      <Text style={styles.text}>rating</Text>
      <Text style={styles.text}>description</Text>
    </TouchableOpacity>
  );

  // const allbuckets = collection(database, "users", "Bucket_list", documentId);

  // const output = getDocs(allbuckets);

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#CAD2C5" : "#84A98C";
    const color = item.id === selectedId ? "white" : "white";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Stories</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
        />
        <Text style={styles.header}>Suggested</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  list: {
    backgroundColor: "white",
    borderColor: "#6667AB",
    borderWidth: 2,
    borderStyle: "solid",
    padding: 6,
    height: 270,
    margin: 10,
    borderRadius: 15,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },

  header: {
    alignSelf: "center",
    fontSize: 20,
    color: "#6667AB",
  },
  titles: {
    color: "white",
    padding: 10,
    fontSize: 25,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  item: {
    backgroundColor: "#6667AB",
    height: 240,
    width: 200,
    padding: 10,
    margin: 5,
    borderRadius: 15,
  },
});

export default Home;
