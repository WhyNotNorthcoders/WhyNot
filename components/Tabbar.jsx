import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import Home from "../screens/Home/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Chat from "../components/Chats/Chat";
import BucketListForm from "./Forms/BucketListForm";
import StoryForm from "./Forms/StoryForm";
import LoginScreen from "../screens/LoginScreen";
import EditProfile from "./Profiles/EditProfile";
import UserPage from "./Profiles/UserPage";
import StoryPage from "./StoryPage/StoryPage";
import DrawerContent from "./DrawerContent";
import ChatScreen from "./Chats/ChatScreen";

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Your Profile" component={Profile} />
      <Drawer.Screen name="Add to bucket list" component={BucketListForm} />
      <Drawer.Screen
        name="Edit profile"
        component={EditProfile}
        options={{ backgroundColor: "#FAF9F6" }}
      />
      <Drawer.Screen
        name="Logout"
        component={LoginScreen}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Add to Story"
        component={StoryForm}
        options={{ drawerLabel: () => null }}
      />
    </Drawer.Navigator>
  );
}

function DrawerRoutes2() {
  return (
    <Drawer.Navigator
      initialRouteName="Search"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="SearchPage"
        component={Search}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="UserPage"
        component={UserPage}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="StoryPage"
        component={StoryPage}
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}

function DrawerRoutes3() {
  return (
    <Drawer.Navigator
      initialRouteName="Home Page"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="Home Page"
        component={Home}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Add bucket list item"
        component={BucketListForm}
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}
function DrawerRoutes4({ userData }) {
  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        userData={userData}
      />
      <Drawer.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  );
}

const Tabbar = ({ userData }) => {
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
          } else if (route.name === "Chats") {
            iconName = focused ? "phone-portrait" : "phone-portrait-outline";
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
        component={DrawerRoutes3}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={DrawerRoutes2}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chats"
        component={DrawerRoutes4}
        userData={userData}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={DrawerRoutes}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabbar;
