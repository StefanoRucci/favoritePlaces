import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PlaceDetails from "./screens/PlaceDetails";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import UserScreen from "./screens/UserScreen";


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        headerBackTitle: "Back",
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen
        name="Homepage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: "Add a new Place",
        }}
      />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        options={{
          title: "Loading Place...",
        }}
      />
    </Stack.Navigator>
  );
}

function HomePage() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: Colors.selected,
      }}
      sceneContainerStyle = { {backgroundColor: Colors.gray700} }
    >
      <BottomTabs.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: "Favorite Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("AddPlace")}
            />
          ),
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        })}
      />
      <BottomTabs.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          title: "My Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        //await SplashScreen.hideAsync();
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsTryingLogin(false);
      }
    };
    initializeApp();
  }, []);

  if (isTryingLogin) {
    return null; 
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
