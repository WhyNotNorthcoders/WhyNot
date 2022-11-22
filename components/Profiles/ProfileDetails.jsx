import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
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
      if (!url) {
        return;
      } else {
        setImageUrl(url);
      }
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
      uploadBytes(imageRef, bytes).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            const userRef = collection(database, "users");
            const data = {
              profile_picture: url,
            };
            const itemRef = doc(userRef, auth.currentUser.uid);
            updateDoc(itemRef, data)
              .then(alert("Profile photo uploaded"))
              .catch((err) => console.log(err.message));
            setImageUrl(url);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    }
  };

  return (
    <SafeAreaView style={styles.profileDetails}>
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
      <Text style={styles.username}>{userInfo.username}</Text>
      <Text style={styles.userInfo}>About: {userInfo.about}</Text>
      <Text style={styles.userInfo}>Location: {userInfo.location}</Text>
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
    marginTop: 20,
    borderRadius: 40,
    padding: 20,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 15,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 110,
    fontSize: 20,
    marginTop: "-22%",
  },
  userInfo: {
    color: "white",
    marginLeft: 110,
    marginTop: 2,
    fontSize: 16,
  },
});

export default ProfileDetails;
