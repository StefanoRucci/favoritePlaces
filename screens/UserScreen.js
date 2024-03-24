import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const UserScreen = () => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();

  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  /* if (width < 300) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 300;
  } */

  const imageStyle = {
    width: imageSize,
    height: imageSize,
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Nascondi lo splash screen
        await SplashScreen.hideAsync();

        // Carica il token salvato in AsyncStorage
        const storedEmail = await AsyncStorage.getItem("email");
        setUser(storedEmail);
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };
    initializeApp();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary800, Colors.primary100]}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/images/profile.jpg")}
        resizeMode="cover"
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.item}>
            <Text style={styles.text}>
              This is the profile page of this application!
            </Text>
            <Text style={styles.text}>
              Actually you are logged as{" "}
              <Text style={styles.userText}>{user}</Text> .
            </Text>
            <StatusBar style="auto" />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={[styles.image, imageStyle]}
              source={require("../assets/images/app.jpg")}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  userText: {
    fontWeight: "bold",
    //color: "red",
  },
  text: {
    fontSize: 16,
  },
  item: {
    padding: 20,
    borderRadius: 6,
    marginTop: 50,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  imageContainer: {
    //width: deviceWidth < 380 ? 150 : 300,
    //height: deviceWidth < 380 ? 150 : 300,
    //borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    opacity: 0.7,
  },
});
