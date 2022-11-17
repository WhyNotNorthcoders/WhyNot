import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import ProfileDetails from "../components/Profiles/ProfileDetails";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebaseConfig";
import "react-native-gesture-handler";

const Profile = () => {
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
  // const bucketRef = collection(
  //   database,
  //   "users",
  //   "BdmUND7DgscJUL9YKMWQprRNTrA3",
  //   "bucketList"
  // );

  // useEffect(() => {
  //   getDocs(bucketRef)
  //     .then((snapshot) => {
  //       let list = [];
  //       snapshot.docs.forEach((doc) => {
  //         list.push({ ...doc.data(), id: doc.id });
  //       });

  //       setData(list);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }, [DATA]);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.titles}>{item.title}</Text>
      <Text style={styles.text}>Category{item.category}</Text>
      <Text style={styles.text}>rating</Text>
      <Text style={styles.text}>description</Text>
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
      <ScrollView style={styles.container}>
        <ProfileDetails />
        <Text style={styles.header}>Bucket List</Text>
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          data={DATA}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
        />
        <Text style={styles.header}>Recently Completed</Text>
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
        />
      </ScrollView>
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
    padding: 2,
    height: 200,
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
    height: 180,
    width: 200,
    padding: 10,
    margin: 5,
    borderRadius: 15,
  },
});

export default Profile;
