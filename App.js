import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Registration from "./screens/Registration";
import * as React from "react";
import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import ActivePages from "./components/ActivePages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";

const Stack = createStackNavigator();

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(false);

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
