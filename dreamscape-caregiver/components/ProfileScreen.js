import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function ProfileScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Patient Profile</Text>
        <View style={styles.profilepic}>

        </View>
        <Text style={styles.paragraph}>Name</Text>
        <Text style={styles.paragraph}>DOB</Text>
        <Text style={styles.paragraph}>User ID</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#19173D',
      paddingTop: 80,
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
    paragraph: {
      color: '#FFFF',
      fontSize: 17,
      marginLeft: 20,
      marginTop: 10,
    },
    profilepic:{
      width: 100,
      height: 100,
      backgroundColor: '#262450',
      borderRadius: 50,
      alignSelf: 'center',
      marginTop: 20,
    },
  });
  

  export default ProfileScreen;