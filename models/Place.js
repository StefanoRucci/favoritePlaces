export class Place {
  constructor(title, imageUri, location, email) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; //{ lat: 0.141241, lng:127.121 }
    this.date = new Date().toString();
    this.email = email;
  }
}
