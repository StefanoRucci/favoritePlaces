import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/http";

import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const isFocused = useIsFocused();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const getPlaces = async () => {
    try {
      setIsFetching(true);
      const places = await fetchPlaces(token);
      setIsFetching(false);
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
  }, [isFocused, token]);

  if(isFetching || refreshing){
    return <LoadingOverlay />
  }

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
