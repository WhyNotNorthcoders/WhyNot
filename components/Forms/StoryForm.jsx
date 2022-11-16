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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { Rating, AirbnbRating } from "react-native-ratings";

const StoryForm = () => {
  const [storyTitle, setStoryTitle] = useState("");
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

  const finishRating = (rating) => {
    setRating(rating);
  };

  console.log(category);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: "center" }}>Complete Story Form</Text>
      <View>
        <TextInput style={styles.textInput} placeholder="Enter Story Title" />
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
        <TextInput style={styles.textInput} placeholder="Enter Location" />
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
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </Pressable>
        </View>
        {/* <AirbnbRating defaultRating={1} size={30} reviewSize={20}  reviewColor={"#CAD2C5"} reviews={["Rating:","Rating:","Rating:","Rating:","Rating:"]} onFinishRating={setRating} /> */}
        <View style={styles.ratingContainer}>
        <Text>Rating: </Text>
          <Rating
            type={"custom"}
            tintColor={"#52796F"}
            minValue={0}
            ratingCount={5}
            onFinishRating={finishRating}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bucketListButton}>
          <Text style={{ textAlign: "center" }}>Complete Story</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#84A98C",
  },
  buttonText: {
    color: "#CAD2C5",
  },
  imageContainer: {
    width: 202,
    height: 202,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default StoryForm;
