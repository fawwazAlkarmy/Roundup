import Toast from "react-native-toast-message";
import { supabase } from "../services/supabase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type UseSignupProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

const useSignup = ({ navigation }: UseSignupProps) => {
  const signupWithEmail = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Toast.show({
        type: "error",
        text1: `${error.message} 😕 `,
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
    } else if (!session) {
      Toast.show({
        type: "success",
        text1: "Please check your inbox for email verification! ✅",
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } else {
      Toast.show({
        type: "success",
        text1: "Account created successfully! 🎉",
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    }
  };
  return { signupWithEmail };
};

export default useSignup;
