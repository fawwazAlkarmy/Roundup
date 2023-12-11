import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileType, RootStackParamList } from "../types";
import { supabase } from "../services/supabase";
import useStore from "../store/useStore";
import { useState, useEffect } from "react";
import FollowItem from "../components/FollowItem";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Following">;
};

const Following = ({ navigation }: Props) => {
  const profiles = useStore((state) => state.profiles);
  const user = useStore((state) => state.user);
  const [following, setFollowing] = useState<ProfileType[]>();
  const getFollowingList = async () => {
    try {
      const { error, data } = await supabase
        .from("profiles")
        .select("following")
        .eq("id", user?.id)
        .single();
      if (error) {
        console.log(error.message);
        return;
      }
      const followingIds = data?.following || [];
      const filteredProfiles = profiles?.filter((profile) =>
        followingIds.includes(profile.id)
      );
      setFollowing(filteredProfiles);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      return;
    }
  };
  useEffect(() => {
    getFollowingList();
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
          Following List
        </Text>
      </View>
      <FlatList
        data={following}
        renderItem={({ item }) => renderData(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
export default Following;
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
