import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileField, RootStackParamList, profileData } from "../types";
import Icon from "react-native-remix-icon";
import { mainStyles } from "../../App";
import { useForm } from "react-hook-form";
import EditFieldList from "../components/EditFieldList";
import useStore from "../store/useStore";
import { supabase } from "../services/supabase";
import Toast from "react-native-toast-message";
import Avatar from "../components/Avatar";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "EditProfile">;
};

const fields: ProfileField[] = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "bio", label: "Bio" },
  { name: "facebookUrl", label: "Facebook Profile Link" },
  { name: "instagramUrl", label: "Instagram Profile Link" },
];

const EditProfile = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<profileData>();
  const profile = useStore((state) => state.profile);
  const image = useStore((state) => state.image);

  const onSubmit = async ({
    name,
    email,
    bio,
    facebookUrl,
    instagramUrl,
  }: profileData) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: name,
          email: email,
          bio: bio,
          facebook_url: facebookUrl,
          instagram_url: instagramUrl,
          avatar_url: image,
        })
        .eq("id", profile?.id);
      if (error) {
        Toast.show({
          type: "error",
          text1: `${error.message} 😕 `,
          position: "top",
          topOffset: 50,
          autoHide: true,
          visibilityTime: 3000,
        });
      }
      Toast.show({
        type: "success",
        text1: "Profile Updated! 🎉",
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
      setTimeout(() => {
        navigation.navigate("Profile");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <AntDesign name="arrowleft" size={26} color={Colors.primary} />
        </Pressable>
        <Avatar />
        <EditFieldList fields={fields} control={control} />
        <Pressable
          style={styles.btn}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={[mainStyles.boldFont, styles.btnText]}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default EditProfile;
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

  btn: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    width: "100%",
  },
  btnText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
