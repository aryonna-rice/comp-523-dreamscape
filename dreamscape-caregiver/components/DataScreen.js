import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function DataScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>User data will go here.</Text>
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
  

  export default DataScreen;