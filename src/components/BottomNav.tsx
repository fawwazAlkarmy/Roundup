import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
const BottomNav = () => {
  return (
    <View style={styles.container}>
      <Icon name="home-5-fill" color={Colors.secondary} size={20} />
      <Icon name="user-3-fill" color={Colors.lightGray} size={20} />
      <Icon name="group-2-fill" color={Colors.lightGray} size={20} />
    </View>
  );
};
export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.primary,
    width: "100%",
    paddingVertical: 18,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
});
