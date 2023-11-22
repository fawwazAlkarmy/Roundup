import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
import { mainStyles } from "../../App";
import { Easing, SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = {
  setMenuIsOpen: (value: boolean) => void;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const SideMenu = ({ setMenuIsOpen, navigation }: Props) => {
  return (
    <Animated.View
      style={styles.menu}
      entering={SlideInLeft.duration(300).easing(Easing.ease)}
      exiting={SlideOutLeft.duration(300).easing(Easing.ease)}
    >
      <Icon
        name="close-circle-fill"
        color={Colors.white}
        size={24}
        style={styles.closeIcon}
        onPress={() => setMenuIsOpen(false)}
      />
      <View style={styles.menuItemsContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <View style={styles.menuItem}>
            <Icon name="login-box-fill" color={Colors.white} size={24} />
            <Text style={[mainStyles.normalFont, styles.menuText]}>Login</Text>
          </View>
        </Pressable>
        <View style={styles.menuItem}>
          <Icon name="settings-3-fill" color={Colors.white} size={24} />
          <Text style={[mainStyles.normalFont, styles.menuText]}>Settings</Text>
        </View>
      </View>
    </Animated.View>
  );
};
export default SideMenu;

const styles = StyleSheet.create({
  menu: {
    width: "45%",
    height: "100%",
    backgroundColor: Colors.primary,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 95,
    right: 30,
  },
  menuItemsContainer: {
    flexDirection: "column",
    padding: 20,
    marginTop: 150,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 55,
    gap: 15,
  },
  menuText: {
    color: Colors.white,
  },
});
