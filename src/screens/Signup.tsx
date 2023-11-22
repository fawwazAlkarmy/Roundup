import { Pressable, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import InputField from "../components/InputField";
import Icon from "react-native-remix-icon";
import { Controller, useForm } from "react-hook-form";
import { FormData } from "../types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

const Signup = ({ navigation }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const onSubmit = ({ name, email, password }: FormData) => {
    console.log(name, email, password);
    reset();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <AntDesign name="arrowleft" size={26} color={Colors.primary} />
      </Pressable>
      <Text style={[mainStyles.boldFont, styles.heading]}>Join Roundup</Text>
      <Text style={[mainStyles.normalFont, styles.subHeading]}>
        Sign up for personalized news and updates
      </Text>

      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            text="Name"
            icon="user-3-fill"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            isPassword={false}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            text="Email"
            icon="mail-fill"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            isPassword={false}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            text="Password"
            icon="door-lock-fill"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            isPassword={true}
          />
        )}
      />

      <Pressable style={styles.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={[mainStyles.boldFont, styles.btnText]}>Signup</Text>
      </Pressable>
      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={[mainStyles.normalFont, styles.orText]}>Or</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.socialContainer}>
        <View style={styles.socialItem}>
          <Icon name="google-fill" size={24} color={Colors.primary} />
          <Text style={[mainStyles.boldFont]}>Google</Text>
        </View>
        <View style={styles.socialItem}>
          <Icon name="facebook-circle-fill" size={24} color={Colors.primary} />
          <Text style={[mainStyles.boldFont]}>Facebook</Text>
        </View>
      </View>
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 28,
    gap: 5,
  },
  heading: {
    fontSize: 26,
    marginTop: 24,
  },
  subHeading: {
    fontSize: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  forgotPassword: {
    borderBottomWidth: 2,
    borderColor: Colors.secondary,
    marginTop: 5,
    width: 102,
    paddingBottom: 2,
    alignSelf: "flex-end",
    marginRight: 15,
    fontSize: 12,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginVertical: 20,
    width: "95%",
  },
  btnText: {
    color: Colors.white,
    textAlign: "center",
  },
  orContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 15,
  },
  line: {
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    width: "25%",
  },
  orText: {
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  socialItem: {
    alignItems: "center",
    gap: 5,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  signupText: {
    borderBottomWidth: 2,
    borderColor: Colors.secondary,
    fontSize: 12,
  },
});
