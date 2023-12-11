import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileType, RootStackParamList } from "../types";
import { useEffect, useState } from "react";
import FollowItem from "../components/FollowItem";
import useStore from "../store/useStore";
import { supabase } from "../services/supabase";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Followers">;
};

const Followers = ({ navigation }: Props) => {
  const profiles = useStore((state) => state.profiles);
  const user = useStore((state) => state.user);
  const [followers, setFollowers] = useState<ProfileType[]>();
  const getFollowersList = async () => {
    try {
      const { error, data } = await supabase
        .from("profiles")
        .select("followers")
        .eq("id", user?.id)
        .single();
      if (error) {
        console.log(error.message);
        return;
      }
      const followersIds = data?.followers || [];
      const filteredProfiles = profiles?.filter((profile) =>
        followersIds.includes(profile.id)
      );
      setFollowers(filteredProfiles);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      return;
    }
  };
  useEffect(() => {
    getFollowersList();
  }, [user, profiles]);

  const renderData = (item: ProfileType) => {
    return <FollowItem profile={item} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <AntDesign name="arrowleft" size={26} color={Colors.primary} />
        </Pressable>
        <Text style={[mainStyles.boldFont, styles.heading]}>
          Followers List
        </Text>
      </View>
      <FlatList
        data={followers}
        renderItem={({ item }) => renderData(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
export default Followers;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 16,
  },
});
