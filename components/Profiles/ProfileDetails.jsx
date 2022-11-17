import { SafeAreaView, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileDetails = () => {
  return (
    <SafeAreaView style={styles.profileDetails}>
      <Text style={styles.username}>Nabeel</Text>
      <Ionicons name={"person-outline"} size={40} style={styles.ionicons} />
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
    marginTop: -20,
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
