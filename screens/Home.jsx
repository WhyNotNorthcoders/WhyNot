import { signOut } from "firebase/auth";
import { Button, SafeAreaView, Text, View } from "react-native";
import BucketListForm from "../components/BucketListForm";
import { auth, onAuthStateChanged } from "../config/firebaseConfig";

const Home = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth);
    navigation.navigate("LoginScreen");
  };
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home page</Text>
        <Button title="Log out" onPress={handleLogout} />
      </View>
    </>
  );
};

export default Home;
