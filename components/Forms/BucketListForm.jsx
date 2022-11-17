import { useState } from "react";
import { auth, database } from "../config/firebaseConfig";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import Modal from "react-native-modal";
import { addDoc, collection } from "firebase/firestore";



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
  const handleSubmit =()=>{
    
    const bucketRef = collection(database, "users", auth.currentUser.uid, "Bucket_list")
    const bucketItem = {title: title, category: category, location: location, targetDate: date, difficulty: difficulty}
    addDoc(bucketRef, bucketItem).then(()=>{
      alert("Item has been added successfully")
    }).catch((err)=>{
      alert(err.message)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}> Bucket List Form </Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Bucket List Name"
          onChangeText={(val)=>setTitle(val)}
        />
        <View>
          <DropDownPicker
            style={{
              backgroundColor: "#CAD2C5",
            }}
            containerStyle={{ padding: 6 }}
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
        <TextInput style={styles.textInput} placeholder="Enter Location"  onChangeText={(val)=>setLocation(val)}/>
        <View>
          <TouchableOpacity onPress={toggleDate}>
            <Text style={styles.textInput}>{date}</Text>
          </TouchableOpacity>
          <Modal isVisible={dateOpen}>
            <View style={{}}>
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
              <Button title="Hide" onPress={toggleDate} />
            </View>
          </Modal>
        </View>
        <TextInput style={styles.textInput} placeholder="Enter Difficulty"  onChangeText={(val)=>setDifficulty(val)} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bucketListButton} onPress={handleSubmit}>
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
