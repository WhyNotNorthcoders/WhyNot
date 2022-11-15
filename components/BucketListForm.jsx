import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const BucketListForm = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([
    { label: "Activities", value: "Activities" },
    { label: "Travel", value: "Travel" },
    { label: "Event", value: "Event" },
    { label: "Education", value: "Education" },
  ]);
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}> Bucket List Form </Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Bucket List Name"
        />
        <View>
          <DropDownPicker
            style={{
              backgroundColor: "#CAD2C5",
            }}
            containerStyle={{ padding: 6 }}
            textStyle={{ fontSize: 16 }}
            placeholder="--Select Category--"
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
          />
        </View>
        <TextInput style={styles.textInput} placeholder="Enter Location" />
        <TextInput style={styles.textInput} placeholder="Enter Target Date" />
        <TextInput style={styles.textInput} placeholder="Enter Difficulty" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bucketListButton}>
          <Text style={{ textAlign: "center" }}>Add Bucket List Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    backgroundColor: "#52796F",
  },

  textInput: {
    color: "black",
    backgroundColor: "#CAD2C5",
    borderRadius: 6,
    borderWidth: 1,
    padding: 5,
    margin: 6,
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bucketListButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#2F3E46",
    backgroundColor: "#84A98C",
  },
});

export default BucketListForm;
