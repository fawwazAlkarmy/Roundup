import { Pressable, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import Icon from "react-native-remix-icon";
import { Colors } from "../colors";
import SingleComment from "./SingleComment";
import Animated, {
  SlideOutDown,
  Easing,
  SlideInDown,
} from "react-native-reanimated";
import CommentInputField from "./CommentInputField";

type Props = {
  toggleComments: () => void;
};

const Comments = ({ toggleComments }: Props) => {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(500).easing(Easing.ease)}
      exiting={SlideOutDown.duration(500).easing(Easing.ease)}
    >
      <View style={styles.header}>
        <Text style={[mainStyles.boldFont]}>Comments (12)</Text>
        <Pressable onPress={toggleComments}>
          <Icon name="close-circle-fill" color={Colors.primary} size={20} />
        </Pressable>
      </View>
      <View style={styles.commentList}>
        <SingleComment />
        <SingleComment />
      </View>
      <View style={styles.inputContainer}>
        <CommentInputField />
      </View>
    </Animated.View>
  );
};
export default Comments;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: Colors.tertiary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  commentList: {
    flex: 1,
  },
  inputContainer: {
    paddingBottom: 10,
  },
});
