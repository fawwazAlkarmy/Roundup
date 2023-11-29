import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Colors } from "./src/colors";
import * as SplashScreen from "expo-splash-screen";
import StackNavigator from "./src/navigation/StackNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { supabase } from "./src/services/supabase";
import useGlobalStore from "./src/store/useStore";

const queryClient = new QueryClient();

export default function App() {
  // loading fonts
  const [fontsLoaded, fontError] = useFonts({
    Lora: require("./assets/fonts/Lora.ttf"),
    LoraBold: require("./assets/fonts/Lora-BoldItalic.ttf"),
    Orbitron: require("./assets/fonts/Orbitron.ttf"),
  });

  const fetchUser = useGlobalStore((state) => state.fetchUser);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    onLayoutRootView();
    supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });
  }, [onLayoutRootView]);

  if (!fontsLoaded || fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
}

export const mainStyles = StyleSheet.create({
  normalFont: {
    fontFamily: "Lora",
    fontSize: 14,
    color: Colors.primary,
  },
  boldFont: {
    fontFamily: "LoraBold",
    color: Colors.primary,
  },
});
