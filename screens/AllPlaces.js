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
  const [firstLoad, setFirstLoad] = useState(true); // Nuovo stato per il primo caricamento
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
    if (isFocused && (firstLoad || refreshing)) { // Controlla se è il primo caricamento o il refresh esplicito
      setRefreshing(true);
      getPlaces();
      setFirstLoad(false); // Imposta il primo caricamento su false dopo il primo caricamento
    }
  }, [isFocused, token, firstLoad, refreshing]);

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
