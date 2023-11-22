import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">;
};

const Onboarding = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>ROUNDUP</Text>
      <Text style={[mainStyles.normalFont, styles.subtitle]}>
        Your One-Stop News App
      </Text>
      <Image
        source={require("../../assets/Images/blur.jpg")}
        style={styles.image}
      />
      {/* Modal */}
      <View style={styles.modal}>
        <Text style={[mainStyles.boldFont, styles.modalTitle]}>
          Your News Your Way
        </Text>
        <Text style={[mainStyles.normalFont]}>
          Customize Your News Feed with Roundup & Discover News Like Never
          Before.
        </Text>
        <View style={styles.modalTabs}>
          <View style={styles.ellipseContainer}>
            <View style={[styles.ellipse, styles.ellipseActive]}></View>
            <View style={styles.ellipse}></View>
          </View>
          <Pressable onPress={() => navigation.navigate("Walkthrough")}>
            <AntDesign name="arrowright" size={26} color={Colors.primary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: "Orbitron",
    fontSize: 27,
    marginBottom: 15,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 50,
  },
  image: {
    width: 260,
    height: 307,
  },
  modal: {
    backgroundColor: Colors.tertiary,
    marginTop: 20,
    padding: 40,
    width: "100%",
    height: 295,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
  },
  modalTitle: {
    fontSize: 29,
    width: 150,
    marginBottom: 15,
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
    marginTop: 30,
  },
});
