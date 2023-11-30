import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({navigation}) {
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
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <Button color={'#B0E9FF'} title="Last Night's Dream" />
        <Button color={'#B0E9FF'} title="Set-up Muse Headset"/>
        <Button color={'#B0E9FF'} title="View Past Dreams" onPress={()=>navigation.navigate("Data")}/>
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
    logo: {
        width: 80,
        height: 80,
        margin: 20,
        alignSelf: 'center',
    },
  
  });
  

  export default HomeScreen;