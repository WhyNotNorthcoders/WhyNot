import { signOut } from "firebase/auth";
import { Button, SafeAreaView, Text, View } from "react-native";
import { auth, onAuthStateChanged } from "../config/firebaseConfig";
import StoryForm from "../components/Forms/StoryForm";

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
      <View>
        <StoryForm />
      </View>
    </>
  );
};

export default Home;
