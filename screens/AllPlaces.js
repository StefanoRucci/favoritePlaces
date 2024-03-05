import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/http";
import { Alert } from "react-native";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const getPlaces = async () => {
    try {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setRefreshing(true);
      getPlaces();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    getPlaces();
  };

  return (
    <PlacesList
      places={loadedPlaces}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

export default AllPlaces;
