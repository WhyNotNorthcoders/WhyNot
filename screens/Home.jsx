import { signOut } from "firebase/auth";
import { Button, SafeAreaView, Text, View } from "react-native";
import { auth, onAuthStateChanged } from "../config/firebaseConfig";
import { Pressable, StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import { auth } from "../config/firebaseConfig";

const Home = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth);
    navigation.navigate("LoginScreen");
  };
  return (
      <SafeAreaView style={styles.container}>
       <Pressable onPress={handleLogout} style={styles.logout}>
        <Text>Log Out</Text>
       </Pressable>
            <Text style={styles.titles}>Latest</Text>
          <ScrollView style={styles.scrollView}>
            <View>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            </View>
          </ScrollView>
          <Text style={styles.titles}>Suggested</Text>
          <ScrollView style={styles.scrollView}>
            <View>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          </ScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354F52",
  },
  logout: {
    backgroundColor: "#CAD2C5",
    width: 80,
    marginLeft: 300,
    height: 50,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#2F3E46",
    padding: 13,
    borderRadius:20,
  },
  scrollView: {
    backgroundColor: '#52796F',
    height: 200,
    margin: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#CAD2C5",
  },  
  text: {
    color: "#CAD2C5",
    padding: 10,
    fontSize: 30,
  },
  titles: {
    color: "#CAD2C5",
    fontSize: 25,
    textAlign: "center"
  },
});

export default Home;