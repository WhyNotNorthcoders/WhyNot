import { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserDetails = (props) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(props.user);
  }, [props.user]);

  return (
    <SafeAreaView style={styles.profileDetails}>
      <Image
        source={{ uri: userInfo.profile_picture }}
        style={styles.ionicons}
      />
      <Text style={styles.username}>{userInfo.username}</Text>
      <Text style={styles.userInfo}>About: {userInfo.about}</Text>
      <Text style={styles.userInfo}>Location: {userInfo.location}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileDetails: {
    flex: 1,
    flexDirection: "column",
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

export default UserDetails;
