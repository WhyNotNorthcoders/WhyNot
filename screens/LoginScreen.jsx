import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextInput,
} from "react-native";
import { auth, database } from "../config/firebaseConfig";
import {
  browserPopupRedirectResolver,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "react-native-paper";

const LoginScreen = () => {
  const { height, width } = Dimensions.get("window");

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
      .then(() => {
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
        animationType="fade"
        transparent={true}
        backdropOpacity={0.4}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={{ position: "absolute", left: 0, top: "1%" }}>
              <Button
                style={{
                  position: "absolute",
                }}
                icon="arrow-left"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Text style={styles.modalText}>Create New Account</Text>
            <View style={styles.regInputView}>
              <TextInput
                style={styles.regTextInput}
                placeholder="Email"
                value={regEmail}
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setRegEmail(email)}
              />
            </View>
            <View style={styles.regInputView}>
              <TextInput
                style={styles.regTextInput}
                placeholder="Username"
                value={regUsername}
                placeholderTextColor="#003f5c"
                onChangeText={(val) => setRegUsername(val)}
              />
            </View>
            <View style={styles.regInputView}>
              <TextInput
                style={styles.regTextInput}
                placeholder="Location"
                placeholderTextColor="#003f5c"
                value={regLocation}
                onChangeText={(val) => setRegLocation(val)}
              />
            </View>
            <View style={styles.regInputView}>
              <TextInput
                style={styles.regTextInput}
                placeholder="D.O.B"
                placeholderTextColor="#003f5c"
                value={regDOB}
                onChangeText={(val) => setRegDOB(val)}
              />
            </View>
            <View style={styles.regInputView}>
              <TextInput
                style={styles.regTextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={regPassword}
                onChangeText={(val) => setRegPassword(val)}
              />
            </View>
            <View style={styles.regInputView}>
              <TextInput
                style={styles.regTextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={regConfirmPassword}
                onChangeText={(val) => setRegConfirmPassword(val)}
              />
            </View>
            <Pressable style={styles.buttonSubmit} onPress={handleRegistration}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ height: height, width: width }}>
        <ImageBackground
          source={require("../Images/Login.jpg")}
          style={{ height: height, width: width }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: height * 1.2,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                  />
                </View>
                <Pressable style={styles.loginBtn} onPress={handleLogin}>
                  <Text
                    style={{ color: "white", fontSize: 14, fontWeight: "600" }}
                  >
                    Login
                  </Text>
                </Pressable>
                <TouchableOpacity
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
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
    fontWeight: "700",
    color: "black",
    textDecorationLine: "underline",
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 45,
    marginBottom: 20,
  },
  regInputView: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 45,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  regTextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
    backgroundColor: "#6667AB",
  },
  modalView: {
    margin: 20,
    height: 520,
    width: 350,
    backgroundColor: "skyblue",
    opacity: 0.97,
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
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonSubmit: {
    backgroundColor: "#6667AB",
    borderRadius: 10,
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
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default LoginScreen;
