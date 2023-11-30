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
  const { control, handleSubmit, reset } = useForm<profileData>();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <AntDesign name="arrowleft" size={26} color={Colors.primary} />
        </Pressable>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require("../../assets/Images/Portrait.jpg")}
          />
          <Icon
            style={styles.icon}
            name="edit-circle-fill"
            size={22}
            color={Colors.secondary}
          />
        </View>
        <EditFieldList fields={fields} control={control} />
        <Pressable style={styles.btn}>
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
  imgContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 100,
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
