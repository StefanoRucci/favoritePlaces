import React from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';

import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

function PlacesList({ places, refreshing, onRefresh }) {
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
      renderItem={({ item }) => <PlaceItem place={item} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]} // Colori dell'indicatore di aggiornamento
          tintColor={Colors.primary} // Colore dell'indicatore di aggiornamento su iOS
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
