import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { createFilter } from "react-native-search-filter";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { auth, database } from "../../config/firebaseConfig";
import { userContext } from "../../context";

const SearchUser = (props) => {
  const { userData } = useContext(userContext);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const Ref = collection(database, "users");
    getDocs(Ref)
      .then((snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          if (doc.id !== auth.currentUser.uid){
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
              props.navigation.navigate("UserPage", { user: item })
            }}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>Username: {item.username} </Text>
              <Text style={styles.itemText}>Location: {item.location}</Text>
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
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#6667AB",
    height: 170,
    fontSize: 20,
    margin: 15,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  itemText: {
    padding: 10,
    textAlign: "center",
    fontSize: 20,
    margin: 10,
  },
});

export default SearchUser;
