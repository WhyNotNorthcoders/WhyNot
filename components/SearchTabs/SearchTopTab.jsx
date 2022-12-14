import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchTop from "./SearchTop";
import SearchUser from "./SearchUsers";
import SearchEvent from "./SearchEvents";

const Tab = createMaterialTopTabNavigator();
function SearchTopTab() {
  return (
    <Tab.Navigator
      initialRouteName="Route1"
      screenOptions={{
        tabBarIndicatorStyle: {
          borderWidth: 2,
          borderColor: "black",
          height: "100%",
          backgroundColor: "#354F52",
        },
        tabBarLabelStyle: {
          color: "#CAD2C5",
          fontSize: 20,
        },
        tabBarStyle: {
          backgroundColor: "white",
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          tabBarInactiveTintColor: "#354F52",
        },
      }}
    >
      <Tab.Screen
        name="SearchTop"
        component={SearchTop}
        options={{ tabBarLabel: "Top" }}
      />
      <Tab.Screen
        name="SearchUser"
        component={SearchUser}
        options={{ tabBarLabel: "User" }}
      />
      <Tab.Screen
        name="SearchEvent"
        component={SearchEvent}
        options={{ tabBarLabel: "Events" }}
      />
    </Tab.Navigator>
  );
}

export default SearchTopTab;
