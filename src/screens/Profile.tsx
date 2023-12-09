import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomNav from "../components/BottomNav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Icon from "react-native-remix-icon";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import useStore from "../store/useStore";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const Profile = ({ navigation }: Props) => {
  const profile = useStore((state) => state.profile);
  const openLink = (url: string) => {
    Linking.openURL(url);
  };
  return (
    <>
      <View style={styles.container}>
        {/* Profile Image & Edit Button  */}
        <View style={styles.row}>
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

          <Pressable
            style={styles.iconTextContainer}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon name="edit-circle-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>Edit Profile</Text>
          </Pressable>
        </View>
        {/* Profile Name */}
        <Text style={[mainStyles.boldFont, styles.profileName]}>
          {profile?.username}
        </Text>
        {/* Followers & Following */}
        <View style={styles.row}>
          <Pressable style={styles.iconTextContainer}>
            <Icon name="user-heart-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>
              {profile?.following.length} following
            </Text>
          </Pressable>
          <Pressable style={styles.iconTextContainer}>
            <Icon name="user-follow-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>
              {profile?.followers.length} Followers
            </Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
        {/* Bio */}
        {profile?.bio ? (
          <>
            <View style={styles.sectionContainer}>
              <Text style={[mainStyles.boldFont]}>Bio</Text>
              <Text style={[mainStyles.normalFont]}>{profile?.bio}</Text>
            </View>
            <View style={styles.line}></View>
          </>
        ) : null}
        {/* More */}
        <View style={styles.sectionContainer}>
          <Text style={[mainStyles.boldFont]}>More</Text>
          <Pressable
            style={styles.iconTextContainer}
            onPress={() => navigation.navigate("SavedArticles")}
            disabled={profile?.saved_articles.length === 0}
          >
            <Icon name="bookmark-fill" size={20} color={Colors.primary} />
            <Text style={[mainStyles.normalFont]}>
              {profile?.saved_articles.length} Saved Articles
            </Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
        {/* Social Media */}
        <View style={styles.sectionContainer}>
          {profile?.facebook_url || profile?.instagram_url ? (
            <Text style={[mainStyles.boldFont]}>Social Media</Text>
          ) : null}
          <View style={styles.socialContainer}>
            {profile?.facebook_url && (
              <Pressable
                style={styles.iconTextContainer}
                onPress={() => openLink(profile?.facebook_url || "")}
              >
                <Icon
                  name="facebook-circle-fill"
                  size={20}
                  color={Colors.primary}
                />
              </Pressable>
            )}
            {profile?.instagram_url && (
              <Pressable
                style={styles.iconTextContainer}
                onPress={() => openLink(profile?.instagram_url || "")}
              >
                <Icon name="instagram-fill" size={20} color={Colors.primary} />
              </Pressable>
            )}
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
