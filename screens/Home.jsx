import { signOut } from "firebase/auth";
// import { Pressable, StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import { auth, database } from "../config/firebaseConfig";

import { useState } from "react";
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



const Home = () => {
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
    addDoc(bucketRef, )
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
        <TextInput style={styles.textInput} placeholder="Enter Difficulty" />
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



//const Home = ({ navigation }) => {
//   const handleLogout = () => {
//     signOut(auth);
//     navigation.navigate("LoginScreen");
//   };
//   return (
//       <SafeAreaView style={styles.container}>
//        <Pressable onPress={handleLogout} style={styles.logout}>
//         <Text>Log Out</Text>
//        </Pressable>
//             <Text style={styles.titles}>Latest</Text>
//           <ScrollView style={styles.scrollView}>
//             <View>
//             <Text style={styles.text}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//               minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//               aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//               pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//               culpa qui officia deserunt mollit anim id est laborum.
//             </Text>
//             </View>
//           </ScrollView>
//           <Text style={styles.titles}>Suggested</Text>
//           <ScrollView style={styles.scrollView}>
//             <View>
//             <Text style={styles.text}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//               minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//               aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//               pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//               culpa qui officia deserunt mollit anim id est laborum.
//             </Text>
//           </View>
//           </ScrollView>
//         </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#354F52",
//   },
//   logout: {
//     backgroundColor: "#CAD2C5",
//     width: 80,
//     marginLeft: 300,
//     height: 50,
//     marginTop: 5,
//     borderWidth: 2,
//     borderColor: "#2F3E46",
//     padding: 13,
//     borderRadius:20,
//   },
//   scrollView: {
//     backgroundColor: '#52796F',
//     height: 200,
//     margin: 10,
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: "#CAD2C5",
//   },  
//   text: {
//     color: "#CAD2C5",
//     padding: 10,
//     fontSize: 30,
//   },
//   titles: {
//     color: "#CAD2C5",
//     fontSize: 25,
//     textAlign: "center"
//   },
// });

export default Home;