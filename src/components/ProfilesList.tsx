import { StyleSheet, Text, View, FlatList } from "react-native";
import { supabase } from "../services/supabase";
import useStore from "../store/useStore";
import { useEffect } from "react";
import { ProfileType, RootStackParamList } from "../types";
import ProfileItem from "./ProfileItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Community">;
};

const ProfilesList = ({ navigation }: Props) => {
  const setProfiles = useStore((state) => state.setProfiles);
  const profiles = useStore((state) => state.profiles);
  const user = useStore((state) => state.user);
  const getProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id);
      setProfiles(data);
      if (error) {
        console.log(error.message);
        return;
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
      return;
    }
  };

  useEffect(() => {
    getProfiles();
  }, [profiles]);

  const renderData = (item: ProfileType) => {
    return <ProfileItem profile={item} navigation={navigation} />;
  };

  return (
    <>
      <FlatList
        data={profiles}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => renderData(item)}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
export default ProfilesList;
const styles = StyleSheet.create({});
