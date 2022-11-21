import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { Rating } from "react-native-ratings";
import { doc, addDoc, collection, deleteDoc } from "firebase/firestore";
import { auth, database } from "../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const StoryForm = ({ route }) => {
  const { title, location, setComplete, category, bucketItemId } = route.params;

  const [storyTitle, setStoryTitle] = useState(title);
  const [description, setDescription] = useState("");
  const [storyLocation, setStoryLocation] = useState(location);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [storyCategory, setStoryCategory] = useState(category);
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

  const navigation = useNavigation();

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

  const submitStory = () => {
    const bucketRef = collection(
      database,
      "users",
      auth.currentUser.uid,
      "Bucket_list"
    );

    const storyRef = collection(
      database,
      "users",
      auth.currentUser.uid,
      "Story_list"
    );

    const itemRef = doc(bucketRef, bucketItemId);

    const storyItem = {
      title: storyTitle,
      category: storyCategory,
      description: description,
      location: storyLocation,
      completeDate: date,
      rating: rating,
    };
    addDoc(storyRef, storyItem)
      .then(() => {
        deleteDoc(itemRef);
        alert("Story has been posted");
        setComplete(true);
        navigation.navigate("Your Profile");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"lightgrey"}
          value={storyTitle}
          onChange={setStoryTitle}
        />
        <View style={{ zIndex: 1 }}>
          <DropDownPicker
            style={styles.textInput}
            placeholder="--Select Category--"
            placeholderTextColor={"white"}
            open={categoryOpen}
            value={storyCategory}
            items={items}
            setOpen={setCategoryOpen}
            setValue={setStoryCategory}
            setItems={setItems}
          />
        </View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Enter Your Experience"
          placeholderTextColor={"white"}
          onChangeText={(val) => {
            setDescription(val);
          }}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"white"}
          value={storyLocation}
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
        <View style={styles.ratingContainer}>
          <Text style={{ color: "black" }}>Rating: </Text>
          <Rating
            style={styles.rating}
            type={"custom"}
            ratingColor={"#FFF36D"}
            tintColor={"#6667AB"}
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
        <TouchableOpacity
          onPress={submitStory}
          style={styles.completeStoryButton}
        >
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
