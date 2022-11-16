import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import Modal from "react-native-modal";

const BucketListForm = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([
    { label: "Activities", value: "Activities" },
    { label: "Travel", value: "Travel" },
    { label: "Event", value: "Event" },
    { label: "Education", value: "Education" },
  ]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const toggleDate = () => {
    setDateOpen(!dateOpen);
  };

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
            // containerStyle={{ padding: 6  }}
            textStyle={{ fontSize: 16 }}
            placeholder="--Select Category--"
            open={categoryOpen}
            value={category}
            items={items}
            setOpen={setCategoryOpen}
            setValue={setCategory}
            setItems={setItems}
          />
        </View>
        <TextInput style={styles.textInput} placeholder="Enter Location" />
        <View>
          <TouchableOpacity style={styles.dateInput} onPress={toggleDate}>
            <Text>Target Date: {date}</Text>
          </TouchableOpacity>
          <Modal isVisible={dateOpen}>
            <View>
              <DatePicker
                mode="monthYear"
                selectorStartingYear={2022}
                onMonthYearChange={(selectedDate) => setDate(selectedDate)}
                options={{
                  backgroundColor: "#354F52",
                  textHeaderColor: "#CAD2C5",
                  textDefaultColor: "#CAD2C5",
                  selectedTextColor: "#fff",
                  mainColor: "#52796F",
                  textSecondaryColor: "#52796F",
                }}
              />
              <Pressable style={styles.button} onPress={toggleDate}>
                <Text style={styles.buttonText}>Hide</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Enter Difficulty"
        />
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
    padding: 15,
    backgroundColor: "#52796F",
  },

  textInput: {
    height: 50,
    width: "100%",
    color: "black",
    backgroundColor: "#CAD2C5",
    borderRadius: 6,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 11,
    marginTop: 6,
    marginBottom: 6,
    // marginRight: 5,
    marginLeft: 1,
  },
  dateInput: {
    height: 50,
    color: "black",
    backgroundColor: "#CAD2C5",
    borderRadius: 6,
    borderWidth: 1,
    paddingTop: 14,
    padding: 10,
    marginRight: 1,
    marginLeft: 1,
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#84A98C",
    marginTop: 5,
  },
});

export default BucketListForm;
