import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { createFilter } from "react-native-search-filter";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth, database } from "../../config/firebaseConfig";

const SearchUser = (props) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const Ref = collection(database, "users");
    getDocs(Ref)
      .then((snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          if (doc.id !== auth.currentUser.uid) {
            list.push({ ...doc.data(), id: doc.id });
          }
        });
        setUsers(list);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  let filteredUsers;
  if (users.length > 0) {
    filteredUsers = users.filter(
      createFilter(props.searchPhrase, ["username", "location"])
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("UserPage", { user: item });
            }}
          >
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.username} </Text>
              <Text style={styles.itemHead}>About Me:</Text>
              <Text style={styles.itemText}>{item.about}</Text>
              <Text style={styles.itemHead}>Location: </Text>
              <Text style={styles.itemText}>{item.location}</Text>
              <Text style={styles.itemHead}>Age:</Text>
              <Text style={styles.itemText}>
                {2022 - item.dob.substr(item.dob.length - 4)}
              </Text>
              <Image
                source={{ uri: item.profile_picture }}
                style={styles.ionicons}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
  },
  item: {
    padding: 10,
    height: 200,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#6667AB",
    fontSize: 20,
    margin: 15,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  itemTitle: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  itemHead: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 15,
    margin: 3,
  },
  ionicons: {
    borderRadius: 15,
    width: 100,
    height: 100,
    marginLeft: "70%",
    marginTop: "-28%",
  },
});

export default SearchUser;
