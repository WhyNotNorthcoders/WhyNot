import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, colRef, database } from "../config/firebaseConfig";

import { Button, StyleSheet, TextInput, View } from "react-native";
import { addDoc, Firestore } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");

  const handleSignup = () => {
    if (!username) {
      alert();
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const userId = auth.currentUser.uid;
        console.log(userId);
        const res = colRef.doc(userId);
        addDoc(res, {
          username: username,
          email: email,
          location: location,
          age: age,
        }).then(() => {
          setUsername("");
          setEmail("");
          setAge("");
          setLocation("");
          setConfirmPassword("");
          setPassword("");
          alert("Registration Successful");
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="Enter username"
        style={styles.input}
        value={username}
        onChangeText={(val) => setUsername(val)}
      ></TextInput>
      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={(val) => setEmail(val)}
      ></TextInput>
      <TextInput
        placeholder="Enter Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(val) => setPassword(val)}
      ></TextInput>
      <TextInput
        placeholder="Confirm  Password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(val) => setConfirmPassword(val)}
      ></TextInput>
      <TextInput
        placeholder="Age"
        style={styles.input}
        value={age}
        onChangeText={(val) => setAge(val)}
      ></TextInput>
      <TextInput
        placeholder="Location"
        style={styles.input}
        value={location}
        onChangeText={(val) => setLocation(val)}
      ></TextInput>
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 100,
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "red",
  },
});
