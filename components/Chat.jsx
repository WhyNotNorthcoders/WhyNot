import { GiftedChat } from "react-native-gifted-chat";
import React, {
  useState,
  useLayoutEffect,
  useCallback,
} from "react";

import { TouchableOpacity } from "react-native";
import {
  addDoc,
  orderBy,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebaseConfig";
import { AntDesign } from "@expo/vector-icons";

export default function Chat({navigation}) {
  const [messages, setMessages] = useState([]);

  const onSignOut = () => {
    signOut(auth).catch((err) => {
      console.log(err);
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color="#C5C5C7"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "Chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "Chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        id: auth?.currentUser?.email,
      }}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
    />
  );
}
