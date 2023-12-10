import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Onboarding from "../screens/Onboarding";
import Walkthrough from "../screens/Walkthrough";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Search from "../screens/Search";
import ArticleDetails from "../screens/ArticleDetails";
import AiPicks from "../screens/AiPicks";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import SavedArticles from "../screens/SavedArticles";
import Community from "../screens/Community";
import ProfileInfo from "../screens/ProfileInfo";
import Followers from "../screens/Followers";
import Following from "../screens/Following";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Walkthrough"
        component={Walkthrough}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AiPicks"
        component={AiPicks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SavedArticles"
        component={SavedArticles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community"
        component={Community}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Followers"
        component={Followers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Following"
        component={Following}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
