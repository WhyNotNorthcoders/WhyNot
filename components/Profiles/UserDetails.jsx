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
import * as ImagePicker from "expo-image-picker";

const UserDetails = (props) => {
  const [image, setImage] = useState("");
  const [userInfo, setUserInfo] = useState({});
  
  useEffect(()=>{
  setUserInfo(props.user)
  },[])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageSelected(true);
    }
  };

  return (
    <SafeAreaView style={styles.profileDetails}>
      <Text style={styles.username}>{userInfo.username}</Text>
          <View>
            {image && <Image source={{ uri: image }} style={styles.ionicons} />}
          </View>
        <Pressable onPress={pickImage}>
          <Ionicons name={"person-outline"} style={styles.ionicons} />
        </Pressable>
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

export default UserDetails;
