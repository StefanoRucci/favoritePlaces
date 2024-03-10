import { ScrollView, Image, View, StyleSheet, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchSinglePlace } from "../util/http";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";


const PlaceDetails = ({ route, navigation }) => {
  const [place, setPlace] = useState();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const showOnMapHandler = () => {
    navigation.navigate('Map', {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(()=>{
    async function loadPlaceData(){
      const response = await fetchSinglePlace(token, selectedPlaceId);
      setPlace(response)
    }
    loadPlaceData();
  },[selectedPlaceId])

  useEffect(() => {
    if (place && place.title) {
      navigation.setOptions({
        title: place.title
      });
    }
  }, [place]);

  if(!place){
    return <LoadingOverlay message="Loading Place Data..." />
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.image }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
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
