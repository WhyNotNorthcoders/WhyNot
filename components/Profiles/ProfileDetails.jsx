import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, database } from "../../config/firebaseConfig";
import { userContext } from "../../context";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setStatusBarStyle } from "expo-status-bar";
import { v4 } from "uuid";

const ProfileDetails = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { userData } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const colRef = doc(database, "users", auth.currentUser.uid);
    getDoc(colRef).then((snapshot) => {
      setUserInfo(snapshot.data());
    });

    const imageRef = ref(
      storage,
      `images/${auth.currentUser.uid + "profile.jpeg"}`
    );
    getDownloadURL(imageRef).then((url) => {
      setImageUrl(url);
    });

  }, [userData]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageRef = ref(
        storage,
        `images/${auth.currentUser.uid + "profile.jpeg"}`
      );
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      uploadBytes(imageRef, bytes);
    }
  };

  return (
    <SafeAreaView style={styles.profileDetails}>
      <Text style={styles.username}>{userInfo.username}</Text>
      {imageUrl ? (
        <Pressable onPress={pickImage}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.ionicons} />
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={pickImage}>
          <Ionicons name={"person-outline"} size={40} style={styles.ionicons} />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileDetails: {
    borderStyle: "solid",
    borderColor: "#CAD2C5",
    borderRadius: 15,
    borderWidth: 2,
    height: 120,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#6667AB",
  },
  ionicons: {
    color: "white",
    borderRadius: 40,
    padding: 17,
    width: 80,
    height: 80,
    borderWidth: 2,
    marginTop: -25,
    borderColor: "white",
    marginLeft: 20,
  },
  username: {
    color: "white",
    marginLeft: 120,
    marginTop: 20,
    fontSize: 18,
  },
});

export default ProfileDetails;
