import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";

type Props = {
  toggleComments: () => void;
};
const ArticleDetailsMenu = ({ toggleComments }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name="bookmark-line" color={Colors.lightGray} size={24} />
      </Pressable>
      <Pressable onPress={toggleComments}>
        <Icon name="message-3-line" color={Colors.lightGray} size={24} />
      </Pressable>
    </View>
  );
};
export default ArticleDetailsMenu;
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 70,
  },
});
