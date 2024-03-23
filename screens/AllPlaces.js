import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/http";

import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true); // Nuovo stato per il primo caricamento
  const [gradientLoaded, setGradientLoaded] = useState(false); // Stato per tracciare il caricamento del gradiente
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
    const loadGradient = async () => {
      // Simula un ritardo nel caricamento del gradiente
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGradientLoaded(true);
    };

    if (!gradientLoaded) {
      loadGradient();
    }
  }, [gradientLoaded]);

  useEffect(() => {
    if (isFocused && (firstLoad || refreshing)) {
      setRefreshing(true);
      getPlaces();
      setFirstLoad(false);
    }
  }, [isFocused, token, firstLoad, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    getPlaces();
  };

  if (!gradientLoaded) {
    return <LoadingOverlay message="Loading ..." />;
  }

  return (
    <LinearGradient colors={[Colors.gray700, Colors.primary800]}>
      <PlacesList
        places={loadedPlaces}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isFetching={isFetching}
      />
    </LinearGradient>
  );
}

export default AllPlaces;
