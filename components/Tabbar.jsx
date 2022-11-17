import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
// import Chat from "./Chat";
import BucketListForm from "./Forms/BucketListForm";
import StoryForm from "./Forms/StoryForm";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import LoginScreen from "../screens/LoginScreen";
import EditProfile from "./Profiles/EditProfile";

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes({ navigation }) {
  const handleLogout = () => {
    signOut(auth);
    navigation.navigate("LoginScreen");
  };
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Your Profile" component={Profile} />
      <Drawer.Screen name="Add to bucket list" component={BucketListForm} />
      <Drawer.Screen name="Add to Story" component={StoryForm} />
      <Drawer.Screen
        name="Edit profile"
        component={EditProfile}
        options={{ backgroundColor: "#FAF9F6" }}
      />
      <Drawer.Screen name="Logout" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

const Tabbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#6667AB",
          borderStyle: "solid",
          borderColor: "white",
          borderTopWidth: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
            // } else if (route.name === "Messages") {
            //   iconName = focused ? "phone-portrait" : "phone-portrait-outline";
            // }
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgrey",
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
      {/* <Tab.Screen
        name="Messages"
        component={Chat}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={DrawerRoutes}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabbar;
