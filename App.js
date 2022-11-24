import { StyleSheet, Pressable } from "react-native";
import * as React from "react";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import ActivePages from "./components/ActivePages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./config/firebaseConfig";
import { userContext } from "./context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, getDocs } from "firebase/firestore";

const Stack = createStackNavigator();

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    auth.signOut();
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserData(user);
      console.log("user ", user.uid);
      const u = getUserDetail(user.uid);
      console.log("output", u);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  function getUserDetail(id) {
    console.log("get user detail ", id);
    const userRef = collection(database, "users");
    let user = "";
    getDocs(userRef, id).then((snapshots) => {
      snapshots.forEach((doc) => {
        if (doc.id === id) {
          user = doc.data().username;
        }
      });
    });
    return user;
  }

  return (
    <userContext.Provider value={userData}>
      <NavigationContainer>
        <Stack.Navigator>
          {LoggedIn ? (
            <Stack.Group>
              <Stack.Screen
                name={"Why Not?"}
                component={ActivePages}
                options={{
                  headerStyle: { backgroundColor: "#6667AB", height: 94 },
                  headerTintColor: "white",
                  headerRight: () => (
                    <Pressable onPress={handleLogout}>
                      <Ionicons
                        name="log-out-outline"
                        style={styles.ionicons}
                      ></Ionicons>
                    </Pressable>
                  ),
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="LoginScreen"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

const styles = StyleSheet.create({
  ionicons: {
    fontSize: 35,
    height: 55,
    marginRight: 10,
    color: "white",
  },
});
