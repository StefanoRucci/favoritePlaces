import axios from "axios";

import storage from "../firebaseConfig";
import { firebaseConfig } from "../firebaseConfig";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
  uploadBytes,
} from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const BACKEND_URL_DATABASE =
  "https://mobileapplication-aaa97-default-rtdb.firebaseio.com";

const BACKEND_URL_STORAGE = "mobileapplication-aaa97.appspot.com";

async function uploadImageToStorage(imageUri) {
  try {
    // Ottieni un'istanza di Firebase Storage
    const storage = getStorage();

     // Genera un nome univoco per il file
     const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000000)}.jpg`;

    // Ottieni un riferimento al percorso nel bucket di storage dove desideri salvare l'immagine
    const storageRef = ref(storage, "images/" + fileName);

    // Effettua una richiesta HTTP per ottenere il contenuto dell'immagine dall'URI
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Carica l'immagine nel bucket
    const snapshot = await uploadBytes(storageRef, blob);

    // Ottieni l'URL di download dell'immagine
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log(
      "Immagine caricata con successo nel bucket di Firebase Storage",
      downloadURL
    );

    return downloadURL;
  } catch (error) {
    console.error(
      "Si è verificato un errore durante il caricamento dell'immagine:",
      error
    );
  }
}

export const storePlace = async (place) => {
  // console.log(place.image)
  const imageURL = await uploadImageToStorage(place.imageUri);
  place.imageUri = imageURL;
  const response = await axios.post(
    firebaseConfig.databaseURL + "/places.json",
    place
  );
  const id = response.data.name; // to obtain the id generated by firebase
  return id;
};

export const fetchPlaces = async () => {
  try {
    const response = await axios.get(firebaseConfig.databaseURL + "/places.json");
    const places = [];
    const storage = getStorage();

    for (const key in response.data) {
      const placeData = response.data[key];

      const placeObj = {
        id: key,
        title: placeData.title,
        address: placeData.address,
        date: new Date(placeData.date),
        location: placeData.location,
        image: placeData.imageUri,
      };
      places.push(placeObj);
    }
    return places;
  } catch (error) {
    console.error('Si è verificato un errore durante il recupero dei luoghi:', error);
    throw error;
  }
};
