import { Image, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";

const SingleComment = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.userImg}
          source={require("../../assets/Images/Portrait.jpg")}
        />
      </View>
      <View>
        <Text style={[mainStyles.boldFont, styles.username]}>
          Wendy{" "}
          <Text style={[mainStyles.normalFont, styles.commentTime]}>
            . 3 hours ago
          </Text>
        </Text>
        <Text style={[mainStyles.normalFont, styles.commentText]}>
          Good point! There are travel bloggers. Then there are freelancers:
          coders mainly
        </Text>
      </View>
    </View>
  );
};
export default SingleComment;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 12,
    marginTop: 30,
  },
  userImg: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  username: {
    marginBottom: 18,
  },
  commentTime: {
    color: Colors.lightGray,
  },
  commentText: {
    width: 250,
  },
});
