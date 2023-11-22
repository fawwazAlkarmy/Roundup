import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";

const CommentInputField = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[mainStyles.normalFont, styles.input]}
        placeholderTextColor={Colors.lightGray}
        placeholder="Share your thoughts..."
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
      <Pressable style={styles.btn}>
        <Text style={[mainStyles.normalFont, styles.btnText]}>Post</Text>
      </Pressable>
    </View>
  );
};
export default CommentInputField;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginLeft: 20,
  },
  input: {
    height: 40,
    width: "70%",
    marginVertical: 18,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 13,
  },
  btn: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -13 }],
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnText: {
    color: Colors.white,
  },
});
