import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Alert, Modal, Pressable } from "react-native";
import { auth, database } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regLocation, setRegLocation] = useState("");
  const [regDOB, setRegDOB] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  const handleLogin = () => {
    if (!email) {
      return alert("Email cannot be empty");
    }
    if (!password) {
      return alert("Password cannot be empty");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        alert("User Logged In"); // remove this later
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password"
        ) {
          setEmail("");
          setPassword("");
          return alert("Email or Password incorrect");
        } else if (err.code === "auth/email-already-in-use") {
          return alert("An account with this email already exists");
        } else {
          return alert("There was a problem with your request");
        }
      });
  };
  const handleRegistration = () => {
    if (!regEmail) {
      return alert("Email cannot be empty");
    }
    if (!regUsername) {
      return alert("Username cannot be empty");
    }
    if (!regLocation) {
      return alert("Location cannot be empty");
    }
    if (!regDOB) {
      return alert("DOB cannot be empty");
    }
    if (!regPassword) {
      return alert("Password cannot be empty");
    }
    if (!regConfirmPassword) {
      return alert("Confirm password cannot be empty");
    }
    if (regPassword !== regConfirmPassword) {
      return alert("Password does not match!");
    }

    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then((registeredUser) => {
        const userId = registeredUser.user.uid;

        setDoc(doc(database, "users", userId), {
          username: regUsername,
          email: regEmail,
          location: regLocation,
          dob: regDOB,
        }).then(() => {
          setRegConfirmPassword("");
          setRegDOB("");
          setRegEmail("");
          setRegLocation("");
          setRegPassword("");
          setRegConfirmPassword("");
          setRegUsername("");
          alert("Registration Successful");
          setModalVisible(!modalVisible);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create New Account</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                value={regEmail}
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setRegEmail(email)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Username"
                value={regUsername}
                placeholderTextColor="#003f5c"
                onChangeText={(val) => setRegUsername(val)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Location"
                placeholderTextColor="#003f5c"
                value={regLocation}
                onChangeText={(val) => setRegLocation(val)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="D.O.B"
                placeholderTextColor="#003f5c"
                value={regDOB}
                onChangeText={(val) => setRegDOB(val)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={regPassword}
                onChangeText={(val) => setRegPassword(val)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={regConfirmPassword}
                onChangeText={(val) => setRegConfirmPassword(val)}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleRegistration}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.logo}>Why Not?</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Create Account</Text>
        </Pressable>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LogIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 20,
    fontSize: 30,
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
  createAccount: {
    width: "60%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "skyblue",
  },
  loginBtn: {
    width: 180,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "green",
  },

  modalView: {
    margin: 20,
    height: 500,
    width: 350,
    backgroundColor: "skyblue",
    borderRadius: 20,
    padding: 35,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "skyblue",
    width: 180,
    height: 40,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default LoginScreen;
