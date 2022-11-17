import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  View,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, database } from "../../config/firebaseConfig";
import { userContext } from "../../context";
import EditProfile from "./EditProfile";

const ProfileDetails = () => {
  const { userData } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const colRef = doc(database, "users", auth.currentUser.uid);
    getDoc(colRef).then((snapshot) => {
      setUserInfo(snapshot.data());
    });
  }, [userData]);

  return (
    <SafeAreaView style={styles.profileDetails}>
      <EditProfile style={styles.modal} />
      <Text style={styles.username}>{userInfo.username}</Text>
      <Ionicons name={"person-outline"} size={40} style={styles.ionicons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileDetails: {
    borderStyle: "solid",
    borderColor: "#CAD2C5",
    borderRadius: 20,
    borderWidth: 2,
    height: 120,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  modal: {},
  ionicons: {
    color: "#CAD2C5",
    borderRadius: 40,
    padding: 17,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#CAD2C5",
    marginTop: -45,
    marginLeft: 20,
  },
  username: {
    color: "#CAD2C5",
    marginLeft: 120,
    marginTop: -10,
    fontSize: 18,
  },
});

export default ProfileDetails;
