import React from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';

import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';
import { useNavigation } from '@react-navigation/native';

function PlacesList({ places, refreshing, onRefresh }) {
  const navigation = useNavigation();

  const selectPlaceHandler = (id, title, image, address, location) => {
    navigation.navigate('PlaceDetails', {
      placeId: id,
      placeTitle: title,
      placeImage: image,
      placeAddress: address,
      placeLocation: location
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors="white" // Colori dell'indicatore di aggiornamento
          tintColor="white" // Colore dell'indicatore di aggiornamento su iOS
        />
      }
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
