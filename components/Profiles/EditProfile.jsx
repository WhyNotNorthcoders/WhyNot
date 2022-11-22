import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  View,
  TextInput,
} from "react-native";

const EditProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Change my Username"
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Update my Location"
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Change my About"
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Change my D.O.B"
            placeholderTextColor="#003f5c"
          />
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.textStyle}>Submit Changes</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

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
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 20,
    width: 180,
    height: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#2F3E46",
    elevation: 2,
    marginBottom: 20,
    color: "black",
  },
  textStyle: {
    color: "black",
    padding: 10,
    textAlign: "center",
  },
});
