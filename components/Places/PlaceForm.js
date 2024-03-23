import { useCallback, useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Place } from "../../models/Place";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { storePlace } from "../../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";



const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const email = authCtx.email;

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
  
  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = async() => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation, user);
    try{
      setIsSubmitting(true);
      const id = await storePlace(placeData, token);
    }catch(err){
      console.log(err)
    }
    onCreatePlace(placeData);
  };

  if(isSubmitting) {
    return <LoadingOverlay message="Adding place..."/>
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
