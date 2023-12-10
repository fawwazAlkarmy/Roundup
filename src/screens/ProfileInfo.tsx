import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Linking,
} from "react-native";
import { Colors } from "../colors";
import { ProfileType, RootStackParamList } from "../types";
import { mainStyles } from "../../App";
import Icon from "react-native-remix-icon";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useStore from "../store/useStore";
import { supabase } from "../services/supabase";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ProfileInfo">;
};

const ProfileInfo = ({ navigation }: Props) => {
  const route = useRoute();
  const { profile } = route.params as { profile: ProfileType };
  const activeProfile = useStore((state) => state.profile);
  const isFollowed = useStore((state) =>
    state.profile?.following.includes(profile.id)
  );
  const setIsFollowed = useStore((state) => state.setIsFollowed);
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleFollow = async () => {
    try {
      const userFollowingList = activeProfile?.following || [];
      const userProfile = await supabase
        .from("profiles")
        .select("followers")
        .eq("id", profile.id)
        .single();

      const userFollowersList = userProfile.data?.followers || [];

      if (!isFollowed) {
        // If the user is being followed
        const updatedFollowingList = [...userFollowingList, profile.id];
        const updatedFollowersList = [...userFollowersList, activeProfile?.id];

        await supabase
          .from("profiles")
          .update({ following: updatedFollowingList })
          .eq("id", activeProfile?.id);

        await supabase
          .from("profiles")
          .update({ followers: updatedFollowersList })
          .eq("id", profile.id);

        setIsFollowed(true);
      } else {
        // If the user is being un-followed
        const updatedFollowingList = userFollowingList.filter(
          (id) => id !== profile.id
        );
        const updatedFollowersList = userFollowersList.filter(
          (id: string) => id !== activeProfile?.id
        );

        await supabase
          .from("profiles")
          .update({ following: updatedFollowingList })
          .eq("id", activeProfile?.id);

        await supabase
          .from("profiles")
          .update({ followers: updatedFollowersList })
          .eq("id", profile.id);

        setIsFollowed(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image & Follow Button  */}
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

        <Pressable style={styles.btnContainer} onPress={handleFollow}>
          {isFollowed ? (
            <Text style={[mainStyles.normalFont, styles.btnText]}>
              UnFollow
            </Text>
          ) : (
            <Text style={[mainStyles.normalFont, styles.btnText]}>Follow</Text>
          )}
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
  );
};
export default ProfileInfo;
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
  btnContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  btnText: {
    color: Colors.white,
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
