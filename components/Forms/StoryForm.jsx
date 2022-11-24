import { useEffect, useState } from "react";
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
import { auth, database, storage } from "../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SafeAreaView } from "react-navigation";

const StoryForm = ({ route }) => {
  const { title, location, category, bucketItemId, setStoryAdded } =
    route.params;

  const [storyTitle, setStoryTitle] = useState("");
  const [description, setDescription] = useState("");
  const [storyLocation, setStoryLocation] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [storyCategory, setStoryCategory] = useState("");
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

  useEffect(() => {
    setStoryTitle(title);
    setStoryLocation(location);
    setStoryCategory(category);
  }, [route.params]);

  const toggleDate = () => {
    setDateOpen(!dateOpen);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageRef = ref(storage, `images/${bucketItemId + "-story.jpeg"}`);
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      uploadBytes(imageRef, bytes).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setImage(url);
        });
      });
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
      storyImage: image,
    };

    addDoc(storyRef, storyItem)
      .then(() => {
        deleteDoc(itemRef);
        alert("Story has been posted");
        setImage(null);
        setStoryAdded(true);
        navigation.navigate("Your Profile");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={"lightgrey"}
            value={storyTitle}
            onChange={setStoryTitle}
          />
        </View>
        <View
          style={{
            zIndex: 1,
          }}
        >
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
            placeholderTextColor={"white"}
            open={categoryOpen}
            value={storyCategory}
            items={items}
            setOpen={setCategoryOpen}
            setValue={setStoryCategory}
            setItems={setItems}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder="Enter Your Experience"
            placeholderTextColor={"black"}
            onChangeText={(val) => {
              setDescription(val);
            }}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={"white"}
            value={storyLocation}
          />
        </View>
        <View style={styles.inputView}>
          <TouchableOpacity onPress={toggleDate}>
            <Text style={styles.textInput}>Complete Date: {date}</Text>
          </TouchableOpacity>
          <Modal isVisible={dateOpen}>
            <View style={styles.inputView}>
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
        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text>Select An Image</Text>
          )}
        </View>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Select Image</Text>
        </Pressable>

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
      </View>
    </ScrollView>
  );
};

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
    height: 150,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#C200FB",
  },

  ratingContainer: {
    justifyContent: "center",
    color: "#6667AB",
    alignitems: "center",
    alignSelf: "center",
    marginBottom: 15,
    margin: 10,
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderColor: "#C200FB",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default StoryForm;
