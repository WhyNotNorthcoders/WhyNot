import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { createFilter } from "react-native-search-filter";
import EventsCard from "./EventsCard";

const SearchEvent = ({ searchPhrase }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://serpapi.com/search.json?engine=google_events&q=Events+in+United+Kingdom&api_key=cbf9cea56cfe76bcdad1f5f2a29f887f54dafebcc8d26e33f0ca2392fa1860ed&start=100"
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events_results);
      });
  }, []);
  console.log();
  const filteredEvents = events.filter(
    createFilter(searchPhrase, ["title", "address"])
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => <EventsCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
  },
});

export default SearchEvent;
