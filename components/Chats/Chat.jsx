import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, List } from "react-native-paper";
import { auth, database } from "../../config/firebaseConfig";

export default function Chat({ navigation }) {
  const [users, setUsers] = useState({});
  //get all users from firebase

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

  console.log(users);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChatScreen", { user: item.username });
            }}
          >
            <List.Item
              key={item.id}
              title={item.username}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
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
  btn: {
    backgroundColor: "white",
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btn2: {
    backgroundColor: "#6667AB",
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 15,
  },
  btntxt: {
    color: "black",
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  btntxtlabel: {},
});

// import { GiftedChat } from "react-native-gifted-chat";
// import React, {
//   useState,
//   useEffect,
//   useLayoutEffect,
//   useCallback,
// } from "react";

// import { TouchableOpacity, Text } from "react-native";
// import {
//   addDoc,
//   orderBy,
//   query,
//   onSnapshot,
//   collection,
// } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import { auth, database } from "../config/firebaseConfig";
// import { useNavigation } from "@react-navigation/native";
// import { AntDesign } from "@expo/vector-icons";

// export default function Chat({navigation}) {
//   const [messages, setMessages] = useState([]);

//   const onSignOut = () => {
//     signOut(auth).catch((err) => {
//       console.log(err);
//     });
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
//           <AntDesign
//             name="logout"
//             size={24}
//             color="#C5C5C7"
//             style={{ marginRight: 10 }}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   useLayoutEffect(() => {
//     const collectionRef = collection(database, "Chats");
//     const q = query(collectionRef, orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs.map((doc) => ({
//           _id: doc.id,
//           createdAt: doc.data().createdAt.toDate(),
//           text: doc.data().text,
//           user: doc.data().user,
//         }))
//       );
//     });
//     return () => unsubscribe();
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//     const { _id, createdAt, text, user } = messages[0];
//     addDoc(collection(database, "Chats"), {
//       _id,
//       createdAt,
//       text,
//       user,
//     });
//   }, []);
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         id: auth?.currentUser?.email,
//       }}
//       messagesContainerStyle={{
//         backgroundColor: "#fff",
//       }}
//     />
//   );
// }
