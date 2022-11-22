import { View, Text } from "react-native";
import {
  Title,
  Caption,
  Paragraph,
  Card,
  Avatar,
  Button,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../config/firebaseConfig";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState({});

  const { comment_text, user_id, created_at } = comment;

  useEffect(() => {
    const user = doc(database, "users", user_id);
    getDoc(user).then((user) => {
      setUser(user.data());
    });
  }, []);

  const deleteComment = () => {
    alert("comment delete button pressed");
  };

  return (
    <View style={styles.commentBox}>
      <Card style={styles.commentCard}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image source={{ uri: user.profile_picture }} size={40} />
            <Card.Content>
              <Paragraph>{'"' + comment_text + '"'}</Paragraph>
              <View>
                <Caption style={{ fontSize: 10 }}>from {user.username}</Caption>
              </View>
            </Card.Content>
            {user_id === auth.currentUser.uid ? (
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Button icon="delete" onPress={deleteComment} />
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </Card>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    margin: 5,
  },
  commentCard: {
    padding: 10,
  },
});
