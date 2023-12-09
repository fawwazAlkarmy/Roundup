import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import useStore from "../store/useStore";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const BottomNav = ({ navigation }: Props) => {
  const route = useRoute();
  const user = useStore((state) => state.user);
  const setMenuIsOpen = useStore((state) => state.setMenuIsOpen);

  const isActiveRoute = (routeName: string) => {
    return route.name === routeName;
  };

  const handleProfileNavigation = () => {
    if (user) {
      navigation.navigate("Profile");
      setMenuIsOpen(false);
    } else {
      navigation.navigate("Login");
      setMenuIsOpen(false);
    }
  };

  const handleCommunityNavigation = () => {
    if (user) {
      navigation.navigate("Community");
      setMenuIsOpen(false);
    } else {
      navigation.navigate("Login");
      setMenuIsOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Icon
          name="home-5-fill"
          color={isActiveRoute("Home") ? Colors.secondary : Colors.lightGray}
          size={20}
        />
      </Pressable>
      <Pressable onPress={handleProfileNavigation}>
        <Icon
          name="user-3-fill"
          color={isActiveRoute("Profile") ? Colors.secondary : Colors.lightGray}
          size={20}
        />
      </Pressable>
      <Pressable onPress={handleCommunityNavigation}>
        <Icon name="group-2-fill" color={Colors.lightGray} size={20} />
      </Pressable>
    </View>
  );
};

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

export default BottomNav;
