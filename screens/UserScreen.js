import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, useWindowDimensions } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "../constants/colors";

const UserScreen = () => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();

  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 300) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

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
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>This is the profile page of this application!</Text>
        <Text>
          Actually you are logged as <Text style={styles.text}>{user}</Text> .
        </Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.imageContainer}>
          <Image
            style={[styles.image, imageStyle]}
            source={require("../assets/app.jpg")}
          />
        </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    //color: "red",
  },
  item: {
    padding: 20,
    borderRadius: 6,
    marginVertical: 12,
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
});
