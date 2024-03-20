import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const UserScreen = () => {
  

  return (
    <View style={styles.container}>
      <Text>This is the <Text style={styles.text}>"User"</Text> screen.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: "bold",
    color: "red"
  }
});
