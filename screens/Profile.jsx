import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useEffect} from "react";
import ProfileDetails from "../components/Profiles/ProfileDetails";
import { collection, getDocs, doc, query, documentId, where } from "firebase/firestore";
import { database, auth } from "../config/firebaseConfig";


const Profile = () => {
  const [DATA, setData] = useState([]);
 



    
    
  const bucketRef = collection(
    database,
    "users",
    auth.currentUser.uid,
    "Bucket_list"
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
  }, []);

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
      <ScrollView style={styles.container} >
        <ProfileDetails />
        <Text style={styles.titles}>Bucket List</Text>
        <FlatList nestedScrollEnabled={true}
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
        />
        <Text style={styles.titles}>Recently Completed</Text>
        <FlatList nestedScrollEnabled={true}
          style={styles.list}
          //data={}
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
    backgroundColor: "#354F52",
  },
  list: {
    backgroundColor: "#52796F",
    height: 200,
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
    fontSize: 25,
    textAlign: "center",
  },
  item: {
    height:180,
    width:200,
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
