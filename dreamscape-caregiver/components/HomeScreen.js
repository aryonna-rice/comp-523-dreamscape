import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image} from 'react-native';

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
        <View style={styles.buttons}>
          <Pressable 
              style={({ pressed }) => [{backgroundColor: pressed ? '#B0E9FF' : '#19173D'}, styles.button]}
              onPress={() => navigation.navigate("Data")}

          >
              <Text style={styles.btntext}>Last Night's Dream</Text>
          </Pressable>
          <Pressable
              style={({ pressed }) => [{backgroundColor: pressed ? '#B0E9FF' : '#19173D'}, styles.button]}
              onPress={() => navigation.navigate("Connect")}
          >
              <Text style={styles.btntext}>Set-up Muse Headset</Text>
          </Pressable>
          <Pressable
              style={({ pressed }) => [{backgroundColor: pressed ? '#B0E9FF' : '#19173D'}, styles.button]}
              onPress={() => navigation.navigate("Data")}
          >
              <Text style={styles.btntext}>View Past Dreams</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#19173D',
      paddingTop: 80,
    },
    buttons:{
      flex: 1,
      backgroundColor: '#262450',
      paddingTop: 20,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
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
    btntext:{
        color: '#FFFF',
        fontSize: 17,
        padding: 10,
    },
    logo: {
        width: 100,
        height: 100,
        margin: 30,
        alignSelf: 'center',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#2836B4',
      elevation: 3,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 20,
  },
  
  });
  

  export default HomeScreen;