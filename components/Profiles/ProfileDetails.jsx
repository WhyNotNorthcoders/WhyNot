import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firebase } from "../../config/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { storage } from "../../config/firebaseConfig";
import {
  Platform,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, database } from "../../config/firebaseConfig";
import { userContext } from "../../context";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ProfileDetails = () => {
  const [image, setImage] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const { userData } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const colRef = doc(database, "users", auth.currentUser.uid);
    getDoc(colRef).then((snapshot) => {
      setUserInfo(snapshot.data());
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
      setImageSelected(true);

      setImage(result.assets[0].uri);
      const imageRef = ref(
        storage,
        "images/",
        `${auth.currentUser.uid}+ "profile.jpeg`
      );

      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      // console.log(source.uri);
      await uploadBytes(imageRef, bytes).then((snapshot) => {
        getDownloadURL(imageRef)
          .then((url) => {
            console.log(url);
            const userRef = collection(database, "users");
            const data = {
              profile_picture: url,
            };
            const itemRef = doc(userRef, auth.currentUser.uid);
            updateDoc(itemRef, data)
              .then(alert("Profile pics has been updated!"))
              .catch((err) => console.log(err.message));
          })
          .catch((err) => {
            console.log(err.msg);
          });
      });
    }
  };
  // const uploadFile = () => {
  //   const storage = getStorage();
  //   const storageRef = ref(storage, "images/" + image.name);

  //   uploadBytes(storageRef, image)
  //     .then((snapshot) => {
  //       getDownloadURL(storageRef)
  //         .then((url) => {
  //           //update the login user to have a profile pics property
  //           const userRef = collection(database, "users");
  //           const data = {
  //             profile_picture: url,
  //           };

  //           const itemRef = doc(userRef, auth.currentUser.uid);
  //           updateDoc(itemRef, data)
  //             .then(console.log("item has been updated"))
  //             .catch((err) => alert(err.message));
  //         })
  //         .catch((error) => {
  //           console.log(error.message);
  //         });
  //       console.log("uploaded a blob or a file");
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  // const uploadToFirebase = async (uri) => {
  //   console.log("calling upload function");
  //   try {
  //     const storage = getStorage();

  //     const img = await fetch(uri);
  //     const bytes = await img.blob();
  //     const ref2 = ref(storage, "images/" + bytes._data.name);
  //     console.log(bytes._data.name);

  //     await uploadBytes(ref2, bytes);
  //     console.log("at the end!");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const uploadImage = async () => {
  //   console.log(image);
  //   setUploading(true);
  //   const response = await fetch(image);
  //   const blob = await response.blob();
  //   const filename = image.substring(image.lastIndexOf("/") + 1);
  //   var ref = firebase.storage().ref().child(filename).put(blob);

  //   try {
  //     await ref;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setUploading(false);

  //   Alert.alert("Photo uploaded... !");
  //   setImage(null);
  // };

  return (
    <SafeAreaView style={styles.profileDetails}>
      <Text style={styles.username}>{userInfo.username}</Text>

      {imageSelected ? (
        <Pressable onPress={pickImage}>
          <View>
            {image && <Image source={{ uri: image }} style={styles.ionicons} />}
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={pickImage}>
          <Ionicons name={"person-outline"} style={styles.ionicons} />
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
