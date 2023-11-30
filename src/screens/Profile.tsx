import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";
import Icon from "react-native-remix-icon";
import { Colors } from "../colors";
import { mainStyles } from "../../App";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const Profile = ({ navigation }: Props) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            style={styles.profileImg}
            source={require("../../assets/Images/Portrait.jpg")}
          />
          <Pressable
            style={styles.iconTextContainer}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon name="edit-circle-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>Edit Profile</Text>
          </Pressable>
        </View>
        <Text style={[mainStyles.boldFont, styles.profileName]}>
          Danial Thomas
        </Text>
        <View style={styles.row}>
          <Pressable style={styles.iconTextContainer}>
            <Icon name="user-heart-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>298 Following</Text>
          </Pressable>
          <Pressable style={styles.iconTextContainer}>
            <Icon name="user-follow-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>173 Followers</Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
        <View style={styles.sectionContainer}>
          <Text style={[mainStyles.boldFont]}>Bio</Text>
          <Text style={[mainStyles.normalFont]}>
            In the bustling world of news reporting, there are those who merely
            follow headlines, and then there are individuals like me, whose
            fervor for environmental journalism is truly remarkable
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.sectionContainer}>
          <Text style={[mainStyles.boldFont]}>More</Text>
          <Pressable style={styles.iconTextContainer}>
            <Icon name="bookmark-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>57 Saved Articles</Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
        <View style={styles.sectionContainer}>
          <Text style={[mainStyles.boldFont]}>Social Media</Text>
          <View style={styles.socialContainer}>
            <Pressable style={styles.iconTextContainer}>
              <Icon
                name="facebook-circle-fill"
                size={20}
                color={Colors.primary}
              />
            </Pressable>
            <Pressable style={styles.iconTextContainer}>
              <Icon name="instagram-fill" size={20} color={Colors.primary} />
            </Pressable>
          </View>
        </View>
      </View>
      <BottomNav navigation={navigation} />
    </>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 28,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileName: {
    fontSize: 18,
    marginVertical: 20,
  },
  line: {
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    marginVertical: 30,
    width: "100%",
  },
  sectionContainer: {
    gap: 10,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 30,
  },
});
