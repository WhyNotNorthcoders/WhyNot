import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titles}>Latest</Text>
          <ScrollView style={styles.scrollView1}>
            <View>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            </View>
          </ScrollView>
          <Text style={styles.titles}>Suggested</Text>
          <ScrollView style={styles.scrollView2}>
            <View>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      scrollView1: {
        backgroundColor: 'grey',
        marginHorizontal: 20,
        marginBottom: 20,
        height: '50%',
      },  
      scrollView2: {
        backgroundColor: 'grey',
        marginHorizontal: 20,
        marginBottom: 20,
        height: '50%',
      },
      text: {
        fontSize: 42,
      },
      titles: {
        fontSize: 25,
        textAlign: "center"
      },
    });

export default Home