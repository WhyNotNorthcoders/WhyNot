import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";
import UserDetails from "./UserDetails";

const UserPage = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [storyData, setStoryData] = useState([]);

  const bucketRef = collection(
    database,
    "users",
    route.params.user.id,
    "Bucket_list"
  );

  const storyRef = collection(
    database,
    "users",
    route.params.user.id,
    "Story_list"
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

    getDocs(storyRef)
      .then((snapshot) => {
        let storyList = [];
        snapshot.docs.forEach((doc) => {
          storyList.push({ ...doc.data(), id: doc.id });
        });
        setStoryData(storyList);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [route.params.user.id]);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.titles}>{item.title}</Text>
      <Text style={styles.text}>Category: {item.category}</Text>
      <Text style={styles.text}>Location: {item.location}</Text>
      {item.targetDate ? (
        <Text style={styles.text}>Date: {item.targetDate}</Text>
      ) : (
        <Text style={styles.text}>Complete Date: {item.completeDate}</Text>
      )}
      {item.difficulty ? (
        <Text style={styles.text}>Difficulty: {item.difficulty}</Text>
      ) : (
        <Text style={styles.text}>Rating: {item.rating} / 5</Text>
      )}
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
      <Button
        style={{
          position: "absolute",
          zIndex: 999,
        }}
        icon="arrow-left"
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <UserDetails user={route.params.user} />
        <Text style={styles.header}>Bucket List</Text>
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          renderItem={renderItem}
          data={data}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
        />
        <Text style={styles.header}>Recently Completed</Text>
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          data={storyData}
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
    marginTop: "10%",
    backgroundColor: "white",
  },
  list: {
    backgroundColor: "white",
    borderColor: "#6667AB",
    borderWidth: 2,
    borderStyle: "solid",
    padding: 2,
    height: 300,
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
    fontWeight: "bold",
  },
  titles: {
    color: "black",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
    marginTop: 4,
  },
  item: {
    padding: 10,
    width: 250,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#6667AB",
    fontSize: 20,
    margin: 10,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
});

export default UserPage;
