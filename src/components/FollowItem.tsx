import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { ProfileType } from "../types";
import { mainStyles } from "../../App";
import useStore from "../store/useStore";
import { Colors } from "../colors";
import { supabase } from "../services/supabase";

type Props = {
  profile: ProfileType;
};
const FollowItem = ({ profile }: Props) => {
  const isFollowed = useStore((state) =>
    state.profile?.following.includes(profile.id)
  );
  const activeProfile = useStore((state) => state.profile);
  const setIsFollowed = useStore((state) => state.setIsFollowed);

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
    <View style={styles.row}>
      <View style={styles.imgNameRow}>
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
        <Text style={[mainStyles.boldFont]}>{profile.username}</Text>
      </View>

      <Pressable style={styles.btnContainer} onPress={handleFollow}>
        {isFollowed ? (
          <Text style={[mainStyles.normalFont, styles.btnText]}>Remove</Text>
        ) : (
          <Text style={[mainStyles.normalFont, styles.btnText]}>Follow</Text>
        )}
      </Pressable>
    </View>
  );
};
export default FollowItem;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  defaultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
  },
  defaultText: {
    color: Colors.white,
    fontSize: 28,
    textAlign: "center",
    lineHeight: 60,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  btnContainer: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  btnText: {
    color: Colors.white,
  },
  imgNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
