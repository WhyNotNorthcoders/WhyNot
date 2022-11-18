import { useState } from "react";
import { auth, database } from "../../config/firebaseConfig";
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
      {/* <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          color: "#6667AB",
        }}
      >
        Bucket List Form
      </Text> */}
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Bucket List Name"
          onChangeText={(val)=>setTitle(val)}
        />
        </View>
        <View
          style={{
            zIndex: 1,
            color: "white",
          }}
        >
          <DropDownPicker
            style={styles.textInput}
            placeholder="--Select Category--"
            placeholderTextColor={"white"}
            open={categoryOpen}
            value={category}
            items={items}
            setOpen={setCategoryOpen}
            setValue={setCategory}
            setItems={setItems}
            dropDownContainerStyle={{
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "black",
            }}
          />
        </View>
        <TextInput style={styles.textInput} placeholder="Enter Location"  onChangeText={(val)=>setLocation(val)}/>
        <View>
          <TouchableOpacity onPress={toggleDate}>
            <Text style={styles.textInput}>{date}</Text>
          </TouchableOpacity>
          </View>
          <Modal isVisible={dateOpen}>
            <View>
              <DatePicker
                mode="monthYear"
                selectorStartingYear={2022}
                onMonthYearChange={(selectedDate) => setDate(selectedDate)}
                options={{
                  backgroundColor: "#6667AB",
                  textHeaderColor: "white",
                  textDefaultColor: "white",
                  selectedTextColor: "black",
                  mainColor: "white",
                  textSecondaryColor: "#52796F",
                }}
                />
                
              <Pressable style={styles.button} onPress={toggleDate}>
                <Text style={styles.buttonText}>Hide</Text>
              </Pressable>
            </View>
          </Modal>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholderTextColor={"lightgrey"}
          placeholder="Enter Difficulty"
          onChangeText={(val)=>setDifficulty(val)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bucketListButton} onPress={handleSubmit}>
          <Text style={{ textAlign: "center", color: "white" }}>
            Add Bucket List Item
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },

  textInput: {
    height: 50,
    width: "100%",
    color: "white",
    backgroundColor: "#6667AB",
    borderRadius: 6,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 11,
    marginTop: 10,
    marginBottom: 10,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },

  targetDate: {
    marginTop: 12,
    color: "white",
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
    backgroundColor: "#6667AB",
    marginTop: 5,
    color: "white",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#BF07F7",
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.75,
    shadowColor: "#6667AB",
  },
  bucketListButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#6667AB",
    marginTop: 5,
    color: "white",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#BF07F7",
    width: "60%",
    height: 40,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.75,
    shadowColor: "#6667AB",
  },
});

export default BucketListForm;
