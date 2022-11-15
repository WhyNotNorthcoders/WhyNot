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
          height: 3,
          backgroundColor: "#2F3E46",
        },
        tabBarLabelStyle: {
          color: "#CAD2C5",
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: "#354F52",
          borderBottomWidth: 0.5,
          borderBottomColor: "black",
          tabBarInactiveTintColor: "#2F3E46",
          tabBarPressColor: "pink",
        },
      }}
    >
      <Tab.Screen
        name="SearchTop"
        component={SearchTop}
        options={{ tabBarLabel: "Top", tabBarPressColor: "#84A98C" }}
      />
      <Tab.Screen
        name="SearchUser"
        component={SearchUser}
        options={{ tabBarLabel: "User", tabBarPressColor: "#84A98C" }}
      />
      <Tab.Screen
        name="SearchEvent"
        component={SearchEvent}
        options={{ tabBarLabel: "Events", tabBarPressColor: "#84A98C" }}
      />
    </Tab.Navigator>
  );
}

export default SearchTopTab;
