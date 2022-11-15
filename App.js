import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "./components/LoginScreen";
import ActivePages from "./components/ActivePages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(true);

  const toggleLogIn = () => {
    setLoggedIn(true);
  };

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
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} extraData={toggleLogIn} />}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
