import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";

function PlaceItem({ place, onSelect }) {
  function formatDateTime(date) {
    // Estrai giorno, mese e ora dalla data
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" }); // Nome del mese
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Formatta la stringa di output
    const formattedDateTime = `${day} ${month} ${hour}:${minutes}`;
    return formattedDateTime;
  }

  const date = formatDateTime(place.date);
  // console.log(place)
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(
        this,
        place.id,
        place.title,
        place.image,
        place.address,
        place.location
      )}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: place.image }} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.emailContainer}>
          <Text>Author: </Text>
          <Text style={styles.email}>{place.email}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
  date: {
    fontSize: 11,
    marginTop: 4,
  },
  emailContainer:{
    flexDirection: "row",
    marginTop: 4,
  },
  email: {
    color: Colors.primary800,
  },
});
