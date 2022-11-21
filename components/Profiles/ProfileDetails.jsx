import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
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

const ProfileDetails = () => {
  const [image, setImage] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const { userData } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});

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

    const source = {uri: result.uri};
    console.log(source)
    setImage(source)

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageSelected(true);
    }
  };

  const UploadImage = async()=>{
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = await response.blob()
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob)

    try{
      await ref;
    } catch(e) {
    console.log(e)
    }
  setUploading(false);
  Alert.alert(
    'Photo uploaded... !'
  );
  setImage(null)
  }
  // const writeToStorage = async (path, file) => {
  //   const storage = st.getStorage(app);
  //   const fileRef = st.ref(storage, path);
  //   const uploadTask = await st.uploadBytesResumable(fileRef, file);
  //   const url = await st.getDownloadURL(uploadTask.ref);
  //   console.log(url);
  // }
  // firebase
  //     .storage()
  //     .ref(user.uid)
  //     .getDownloadURL()
  //     .then((result) => {
  //       if (result != null) {
  //         //Do whatever you want to with the image
  //       }
  //     })
    
    

  return (
    <SafeAreaView style={styles.profileDetails}>
      <Text style={styles.username}>{userInfo.username}</Text>

      {imageSelected ? (
        <Pressable onPress={pickImage}>
          <View>
            {image && <Image source={{ uri: image }} style={styles.ionicons} />}
            <TouchableOpacity style={styles.uploadButton} onPress={UploadImage}>
              <Text style={styles.buttonText}>
                Upload Image 
              </Text>
            </TouchableOpacity>
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
