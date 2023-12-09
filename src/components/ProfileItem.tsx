import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ProfileType } from "../types";
import { mainStyles } from "../../App";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";

type Props = {
  profile: ProfileType;
};

const ProfileItem = ({ profile }: Props) => {
  return (
    <View style={styles.container}>
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
    </View>
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
