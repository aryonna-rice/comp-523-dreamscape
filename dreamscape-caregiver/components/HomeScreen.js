import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

function HomeScreen() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    let date = month + " " + day + ", " + year;
  
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Welcome back User!</Text>
        <Text style={styles.header2}>{date}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#19173D',
      justifyContent: 'center',
    },
    header1: {
      color: '#B0E9FF',
      fontSize: 30,
      marginLeft: 20,
    },
    header2: {
      color: '#B0E9FF',
      fontSize: 20,
      marginLeft: 20,
    },
  
  });
  

  export default HomeScreen;