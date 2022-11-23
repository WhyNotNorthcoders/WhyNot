import { useEffect, useState } from "react";
import { auth, database } from "../../config/firebaseConfig";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import Modal from "react-native-modal";
import { addDoc, collection } from "firebase/firestore";

const BucketListForm = ({route, navigation}) => {
  
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
  const [suggested, setSuggested] = useState(false);
  
  useEffect(()=>{
    if (route.params !== undefined) {
      const {Title, Category, Location, Difficulty} = route.params
      setCategory(Category)
      setDifficulty(Difficulty)
      setTitle(Title)
      setLocation(Location)
      setSuggested(true)
    }
  },[route.params])

  const toggleDate = () => {
    setDateOpen(!dateOpen);
  };
  const handleSubmit = () => {
    const bucketRef = collection(
      database,
      "users",
      auth.currentUser.uid,
      "Bucket_list"
    );
    const bucketItem = {
      title: title,
      category: category,
      location: location,
      targetDate: date,
      difficulty: difficulty,
    };
    addDoc(bucketRef, bucketItem)
      .then(() => {
        alert("Item has been added successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
 <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Bucket List Item Name"
          value={title}
          placeholderTextColor={"#003f5c"}
          onChangeText={(val) => setTitle(val)}
        />
      </View>
      <View style={{ zIndex: 1 }}>
        <DropDownPicker
          style={{
            zIndex: 1,
            borderRadius: 30,
            width: 300,
            marginBottom: 20,
            borderWidth: 2,
            borderColor: "#C200FB",
          }}
          placeholder="--Select Category--"
          placeholderTextColor={"#003f5c"}
          open={categoryOpen}
          value={category}
          items={items}
          setOpen={setCategoryOpen}
          setValue={setCategory}
          setItems={setItems}
          dropDownContainerStyle={{
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#C200FB",
            width: 300,
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Location"
          value={location}
          placeholderTextColor={"#003f5c"}
          onChangeText={(val) => setLocation(val)}
        />
      </View>
      <View style={styles.inputView}>
        <TouchableOpacity onPress={toggleDate}>
          <Text style={styles.textInput}>Target Date: {date}</Text>
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholderTextColor={"#003f5c"}
          placeholder="Enter Difficulty"
          value={difficulty}
          onChangeText={(val) => setDifficulty(val)}
        />
      </View>
      <View>
      <TouchableOpacity
          style={styles.bucketListButton}
          onPress={handleSubmit}
        >
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Add Bucket List Item
          </Text>
        </TouchableOpacity>
        {suggested ?<TouchableOpacity
          style={styles.backButton}
          onPress={() => {navigation.navigate("Home Page")}}
        >
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Go Back!
          </Text>
        </TouchableOpacity> : <></>}
      </View>
    </View>
  </SafeAreaView> 
)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAF9F6",
  },
  inputView: {
    backgroundColor: "white",
    borderColor: "#C200FB",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    backgroundColor: "white",
  },
  targetDate: {
    marginTop: 12,
    color: "white",
  },
  bucketListButton: {
    justifyContent: "center",
    width: 200,
    height: 50,
    margin: 10,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "green",
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
  backButton: {
    justifyContent: "center",
    width: 200,
    height: 50,
    margin: 10,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "green",
  }
});

export default BucketListForm;
