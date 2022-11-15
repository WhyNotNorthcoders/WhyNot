import {
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  View,
  TextInput,
} from "react-native";
import { useState } from "react";

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Details</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="New Username"
                placeholderTextColor="#003f5c"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="New Location"
                placeholderTextColor="#003f5c"
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Submit Changes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.editButton, styles.editButtonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Edit Profile</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "white",
    borderColor: "black",
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
  modalView: {
    height: 300,
    width: 350,
    backgroundColor: "#84A98C",
    borderWidth: 2,
    borderColor: "#2F3E46",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 80,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#2F3E46",
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#CAD2C5",
    width: 180,
    height: 40,
    margin: 5,
  },
  editButton: {
    borderRadius: 20,
    width: 150,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#2F3E46",
    padding: 10,
    elevation: 2,
  },
  editButtonOpen: {
    backgroundColor: "#CAD2C5",
    width: 100,
    marginLeft: 260,
    height: 40,
    margin: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#2F3E46",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: "#2F3E46",
  },
});
