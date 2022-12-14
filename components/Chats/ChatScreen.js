import {
  collection,
  onValue,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { userContext } from "../../context";

import { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { auth, database } from "../../config/firebaseConfig";
export default function ChatScreen(props) {
  const username = props.route.params.user;
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const thread = props.route.params.user;

  useEffect(() => {
    const collectionRef = collection(database, "THREADS", "Gary", thread);

    getDocs(collectionRef).then((snapshot) => {
      let messages = [];

      snapshot.forEach((doc) => {
        messages.push({ ...doc.data() });
        setMessageList(messages);
      });
    });
  }, [message]);

  async function handleSend() {
    //create new chat room

    const messageRef = collection(database, "THREADS", "Gary", thread);
    addDoc(messageRef, {
      message,
      createdAt: new Date().getTime(),
      sender: "Gary",
      reciever: username,
    }).then(() => {
      const receiverRef = collection(database, "THREADS", thread, "Gary");
      addDoc(receiverRef, {
        message,
        createdAt: new Date().getTime(),
        sender: "Moroti",
        reciever: username,
      })
        .then(() => {
          setMessage("");
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  }

  function renderHeader() {
    return (
      <View style={styles.row}>
        <Button
          title={"back"}
          onPress={() =>
            props.navigation.reset({ index: 0, routes: [{ name: "Chat" }] })
          }
        >
          <Ionicons name={"md-arrow-back"} color={"white"} size={30} />
        </Button>
        <Text style={styles.btntxtlabel}>{username}</Text>
      </View>
    );
  }
  function renderTextInput() {
    return (
      <View style={styles.row}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={(val) => setMessage(val)}
        />
        <Pressable style={{ padding: 15 }} onPress={handleSend}>
          <MaterialIcons name={"send"} color={"white"} size={40} />
        </Pressable>
      </View>
    );
  }
  function renderbody() {
    return (
      <View style={{ height: "75%" }}>
        <FlatList
          data={messageList}
          renderItem={({ item, index }) => {
            return (
              <View
                style={
                  item.user == auth.currentUser.uid ? styles.right : styles.left
                }
              >
                <Text style={styles.btntxt}>{item?.message}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderbody()}
      {renderTextInput()}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 2,
  },
  left: {
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 10,
    pading: 2,
    margin: 5,
  },
  right: {
    alignItems: "flex-end",
    backgroundColor: "white",
    borderRadius: 10,
    pading: 10,
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  btn: {
    backgroundColor: "white",
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btn2: {
    backgroundColor: "white",
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  btntxt: {
    color: "black",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  btntxtlabel: {
    color: "white",
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
    width: "90%",
  },
});
