import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ProfileType, RootStackParamList } from "../types";
import { mainStyles } from "../../App";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  profile: ProfileType;
  navigation: NativeStackNavigationProp<RootStackParamList, "Community">;
};

const ProfileItem = ({ profile, navigation }: Props) => {
  const handleNavigation = () => {
    navigation.navigate("ProfileInfo", { profile });
  };

  return (
    <Pressable style={styles.container} onPress={handleNavigation}>
      <View style={styles.itemContainer}>
        {profile.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} style={styles.img} />
        ) : (
          <View style={styles.defaultImage}>
            <Text style={[mainStyles.boldFont, styles.defaultText]}>
              {profile?.username[0]}
            </Text>
          </View>
        )}
        <Text style={[mainStyles.normalFont]}>{profile?.username}</Text>
      </View>
      <Pressable style={styles.iconContainer}>
        <Icon name="add-fill" color="#fff" size={20} />
      </Pressable>
    </Pressable>
  );
};
export default ProfileItem;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: 35,
  },
  itemContainer: {
    alignItems: "center",
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  defaultImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
  },
  defaultText: {
    color: Colors.white,
    fontSize: 26,
    textAlign: "center",
    lineHeight: 58,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: -3,
  },
});
