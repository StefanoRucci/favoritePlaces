import { ScrollView, Image, View, StyleSheet, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";

const PlaceDetails = ({ route, navigation }) => {

  const showOnMapHandler = () => {
    navigation.navigate('Map', {
      initialLat: route.params.placeLocation.lat,
      initialLng: route.params.placeLocation.lng,
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
      navigation.setOptions({
        title: route.params.placeTitle
      });
  }, []);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: route.params.placeImage }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{route.params.placeAddress}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
