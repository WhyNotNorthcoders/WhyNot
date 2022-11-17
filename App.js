import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Registration from "./screens/Registration";
import * as React from "react";
import "react-native-gesture-handler";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import ActivePages from "./components/ActivePages";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(true);
    }
  });

  return (
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
  );
}
