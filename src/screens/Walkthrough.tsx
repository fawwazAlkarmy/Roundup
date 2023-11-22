import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { mainStyles } from "../../App";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">;
};

const Walkthrough = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalTabs}>
        <Pressable onPress={() => navigation.navigate("Onboarding")}>
          <AntDesign name="arrowleft" size={26} color={Colors.primary} />
        </Pressable>
        <View style={styles.ellipseContainer}>
          <View style={styles.ellipse}></View>
          <View style={[styles.ellipse, styles.ellipseActive]}></View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={[mainStyles.normalFont, styles.subTitle]}>Our App is</Text>
        <Text style={[mainStyles.boldFont, styles.title]}>Powered</Text>
        <Text style={[mainStyles.boldFont, styles.title]}>With AI</Text>
      </View>
      <Image
        source={require("../../assets/Images/newspapers.jpg")}
        style={styles.image}
      />
      <Text style={[mainStyles.normalFont, styles.featureText]}>
        No need to worry about which news you like, relax & enjoy we will take
        care.
      </Text>
      <Pressable style={styles.btn} onPress={() => navigation.navigate("Home")}>
        <Text style={[mainStyles.boldFont, styles.btnText]}>Explore</Text>
      </Pressable>
    </View>
  );
};
export default Walkthrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  ellipseContainer: {
    flexDirection: "row",
  },
  ellipse: {
    width: 9,
    height: 9,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: "#d9d9d9",
  },
  ellipseActive: {
    backgroundColor: Colors.primary,
  },
  modalTabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 220,
  },
  title: {
    fontSize: 33,
  },
  subTitle: {
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: 28,
  },
  image: {
    width: 500,
    height: 270,
    marginTop: 30,
  },
  featureText: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 50,
    width: "60%",
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 75,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 16,
    color: Colors.white,
  },
});
