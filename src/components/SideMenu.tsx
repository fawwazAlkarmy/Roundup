import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
import { mainStyles } from "../../App";
import { Easing, SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { supabase } from "../services/supabase";
import Toast from "react-native-toast-message";

import useStore from "../store/useStore";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const SideMenu = ({ navigation }: Props) => {
  const user = useStore((state) => state.user);
  const profile = useStore((state) => state.profile);
  const setUser = useStore((state) => state.setUser);
  const setMenuIsOpen = useStore((state) => state.setMenuIsOpen);

  const handleLoginNavigation = () => {
    navigation.navigate("Login");
    setMenuIsOpen(false);
  };

  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
    setMenuIsOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error.message);
    else {
      setUser(null);
      Toast.show({
        type: "success",
        text1: "Logout successful",
        text2: "You have been logged out",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
      setMenuIsOpen(false);
    }
  };

  return (
    <Animated.View
      style={styles.menu}
      entering={SlideInLeft.duration(200).easing(Easing.ease)}
      exiting={SlideOutLeft.duration(200).easing(Easing.ease)}
    >
      <Icon
        name="close-circle-fill"
        color={Colors.white}
        size={24}
        style={styles.closeIcon}
        onPress={() => setMenuIsOpen(false)}
      />
      <View style={styles.menuItemsContainer}>
        {!user && (
          <Pressable onPress={handleLoginNavigation}>
            <View style={styles.menuItem}>
              <Icon name="login-box-fill" color={Colors.white} size={24} />
              <Text style={[mainStyles.normalFont, styles.menuText]}>
                Login
              </Text>
            </View>
          </Pressable>
        )}
        {user && (
          <>
            <View style={styles.menuItem}>
              {!profile?.avatar_url ? (
                <View style={styles.defaultImage}>
                  <Text style={[mainStyles.boldFont, styles.defaultText]}>
                    {profile?.username[0]}
                  </Text>
                </View>
              ) : (
                <Image
                  style={styles.profileImg}
                  source={{ uri: profile.avatar_url }}
                />
              )}
            </View>
            <Pressable
              style={styles.menuItem}
              onPress={handleProfileNavigation}
            >
              <Icon name="user-6-fill" color={Colors.white} size={24} />
              <Text style={[mainStyles.normalFont, styles.menuText]}>
                {profile?.username}
              </Text>
            </Pressable>
            <Pressable onPress={handleLogout}>
              <View style={styles.menuItem}>
                <Icon name="logout-box-fill" color={Colors.white} size={24} />
                <Text style={[mainStyles.normalFont, styles.menuText]}>
                  Logout
                </Text>
              </View>
            </Pressable>
          </>
        )}
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
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  defaultImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.secondary,
  },
  defaultText: {
    color: Colors.white,
    fontSize: 32,
    textAlign: "center",
    lineHeight: 70,
  },
});
