import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { Rating, AirbnbRating } from "react-native-ratings";

const StoryForm = () => {
  const [storyTitle, setStoryTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([
    { label: "Activities", value: "Activities" },
    { label: "Travel", value: "Travel" },
    { label: "Event", value: "Event" },
    { label: "Education", value: "Education" },
  ]);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(
    new Date().getFullYear() + " " + (new Date().getMonth() + 1)
  );
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState("");

  const toggleDate = () => {
    setDateOpen(!dateOpen);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={{ textAlign: "center" }}>Complete Story Form</Text> */}
      <View>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"lightgrey"}
          placeholder="Enter Story Title"
          onChange={setStoryTitle}
        />
        <View style={{ zIndex: 1 }}>
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
          />
        </View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Enter Your Experience"
          placeholderTextColor={"white"}
          onChange={setDescription}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"white"}
          placeholder="Enter Location"
        />
        <View>
          <TouchableOpacity onPress={toggleDate}>
            <Text style={styles.textInput}>Complete Date: {date}</Text>
          </TouchableOpacity>
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
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <View style={styles.imageContainer}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </Pressable>
        </View>
        {/* <AirbnbRating defaultRating={1} size={30} reviewSize={20}  reviewColor={"#CAD2C5"} reviews={["Rating:","Rating:","Rating:","Rating:","Rating:"]} onFinishRating={setRating} /> */}
        <View style={styles.ratingContainer}>
          <Text style={{ color: "black" }}>Rating: </Text>
          <Rating
            style={styles.rating}
            type={"custom"}
            ratingColor={"#FFF36D"}
            tintColor={"white"}
            ratingBackgroundColor={"#CAD2C5"}
            minValue={0}
            ratingCount={5}
            onFinishRating={(rating) => {
              setRating(rating);
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.completeStoryButton}>
          <Text style={{ textAlign: "center", color: "white" }}>
            Complete Story
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    borderRadius: 25,
    backgroundColor: "white",
  },
  textInput: {
    color: "white",
    backgroundColor: "#6667AB",
    borderRadius: 6,
    borderColor: "#6667AB",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
    width: "100%",
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  completeStoryButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    bottom: 20,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#2F3E46",
    backgroundColor: "#6667AB",
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
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#2F3E46",
  },

  ratingContainer: {
    justifyContent: "center",
    color: "#6667AB",
    alignitems: "center",
    alignSelf: "center",
    marginBottom: 15,
    margin: 10,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderColor: "#6667AB",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default StoryForm;
