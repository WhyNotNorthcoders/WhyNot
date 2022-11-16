import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Messages from "./Messages";
<<<<<<< HEAD
import Profile from "../screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
=======
import Profile from "./Profiles/Profile";
>>>>>>> f5472c38a6765c383cab4eee20c6cf17c380e396
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Tabbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#2F3E46",
          borderStyle: "solid",
          borderColor: "#CAD2C5",
          borderTopWidth: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "phone-portrait" : "phone-portrait-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#84A98C",
        tabBarInactiveTintColor: "#CAD2C5",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabbar;
