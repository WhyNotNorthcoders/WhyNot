import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Registration from "./screens/Registration";
import * as React from "react";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import ActivePages from "./components/ActivePages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAdditionalUserInfo, onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./config/firebaseConfig";
import Chat from "./components/Chat";
import { collection, getDocs } from "firebase/firestore";
import { userContext } from "./context";

const Stack = createStackNavigator();

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const[userData, setUserData]= useState({})

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      getUser()
    } else {
      setLoggedIn(false);
    }
  });

  const getUser = () => {
  const colRef = collection(database, "users");
  getDocs(colRef).then((snapshot) => {
  let users1 = []
  snapshot.docs.forEach((doc) => {
    users1.push({ ...doc.data(), id: doc.id });
  });
  
  setUserData(users1[0])
  })
  
  
  }
  return (
    <userContext.Provider value = {userData}>
    <NavigationContainer>
      <Stack.Navigator>
        {LoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="Why Not?"
              component={ActivePages}
              options={{
                headerStyle: { backgroundColor: "#2F3E46", height: 94 },
                headerTintColor: "#CAD2C5",
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
