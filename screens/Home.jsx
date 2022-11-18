import {
  Pressable,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titles}>Latest</Text>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>
      <Text style={styles.titles}>Suggested</Text>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#6667AB",
    height: 200,
    margin: 10,
    borderRadius: 15,
    shadowRadius: 15,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowColor: "black",
    padding: 20,
  },
  text: {
    color: "#6667AB",
    fontSize: 20,
  },
  titles: {
    marginTop: 10,
    color: "#6667AB",
    fontSize: 25,
    textAlign: "center",
  },
});

export default Home;
