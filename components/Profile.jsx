import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebaseConfig";

const Profile = () => {
  const [DATA, setData] = useState([]);

  const bucketRef = collection(
    database,
    "users",
    "BdmUND7DgscJUL9YKMWQprRNTrA3",
    "bucketList"
  );

  useEffect(() => {
    getDocs(bucketRef)
      .then((snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });

        setData(list);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [DATA]);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.titles, textColor]}>Title: {item.title}</Text>
      <Text style={[styles.titles, textColor]}>Category: {item.category}</Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.titles}>Bucket List</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <Text style={styles.titles}>Recently Completed</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354F52",
  },
  list: {
    backgroundColor: "#52796F",
    height: "100%",
    margin: 10,
    borderRadius: 15,
  },
  text: {
    color: "#CAD2C5",
    fontSize: 42,
  },
  titles: {
    color: "#CAD2C5",
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: "solid",
    borderColor: "#CAD2C5",
    borderWidth: 2,
    borderRadius: 15,
  },
});

export default Profile;
