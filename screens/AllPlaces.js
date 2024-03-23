import React, { useEffect, useState } from "react";
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
  const [firstLoad, setFirstLoad] = useState(true);
  const isFocused = useIsFocused();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    const getPlaces = async () => {
      try {
        setIsFetching(true);
        const places = await fetchPlaces(token);
        setLoadedPlaces(places);
        setIsFetching(false);
        setRefreshing(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (isFocused && (firstLoad || refreshing)) {
      setRefreshing(true);
      getPlaces();
      setFirstLoad(false);
    }
  }, [isFocused, token, firstLoad, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <LinearGradient
      colors={[Colors.gray700, Colors.primary800]}
      style={{ flex: 1 }}
    >
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
