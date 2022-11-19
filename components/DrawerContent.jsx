import { View, StyleSheet, Pressable } from "react-native";
import {
  Text,
  Title,
  Avatar,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Swtich,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import ProfileAvatar from "./images/profile.jpg";
import { auth } from "../config/firebaseConfig";

const DrawerContent = (props) => {
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={[styles.userInfoSection, { flexDirection: "row" }]}>
            <View style={{ marginTop: 15, marginBottom: 15 }}>
              <Pressable
                onPress={() => {
                  props.navigation.navigate("Your Profile");
                }}
              >
                <Avatar.Image source={ProfileAvatar} />
              </Pressable>
            </View>
            <View style={{ marginLeft: 9, marginTop: 15 }}>
              <Pressable
                onPress={() => {
                  props.navigation.navigate("Your Profile");
                }}
              >
                <Title style={styles.title}>Profile Name</Title>
              </Pressable>
              <Caption style={styles.caption}>User Caption</Caption>
            </View>
          </View>
          <View style={[styles.row, styles.userInfoSection]}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                80
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
            <View style={[styles.section, { marginLeft: 15 }]}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                20
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
          </View>
          <Drawer.Section style={{ flex: 1, marginTop: 15 }}>
            <DrawerItem
              label="Add To Bucket List"
              icon={({ focused, size, color }) => (
                <Ionicons
                  color={color}
                  size={size}
                  name={focused ? "add-outline" : "add-outline"}
                />
              )}
              onPress={() => {
                props.navigation.navigate("Add to bucket list");
              }}
            />
            <DrawerItem
              label="Edit Profile"
              icon={({ focused, size, color }) => (
                <Ionicons
                  color={color}
                  size={size}
                  name={focused ? "create-outline" : "create-outline"}
                />
              )}
              onPress={() => {
                props.navigation.navigate("Edit profile");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ focused, size, color }) => (
            <Ionicons
              color={color}
              size={size}
              name={focused ? "log-out-outline" : "log-out-outline"}
            />
          )}
          label="Log Out"
          onPress={handleLogout}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: { flex: 1, padding: 5 },
  userInfoSection: {
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
  },
  caption: {
    fontStyle: "italic",
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});

export default DrawerContent;