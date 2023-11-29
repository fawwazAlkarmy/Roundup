import Toast from "react-native-toast-message";
import { supabase } from "../services/supabase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type UseLoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

const useLogin = ({ navigation }: UseLoginProps) => {
  const signinWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
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
    } else {
      Toast.show({
        type: "success",
        text1: "Welcome back! 👋",
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    }
  };
  return { signinWithEmail };
};

export default useLogin;
