import * as React from "react";
import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import ActivePages from "./components/ActivePages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { userContext } from "./context";

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
            <Stack.Screen name="Why Not?" component={ActivePages} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="LoginScreen">
              {(props) => <LoginScreen {...props} extraData={toggleLogIn} />}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
