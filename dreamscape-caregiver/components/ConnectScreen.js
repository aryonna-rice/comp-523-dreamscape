import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


function ConnectScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Connect to your Muse Headset</Text>
        <Image source={require('../assets/museheadset.png')} style={styles.headset}/>
        <Pressable 
            style={({ pressed }) => [{backgroundColor: pressed ? '#B0E9FF' : '#333069'}, styles.button]}
            onPress={() => alert('Connect to Muse Headset')}
        >
            <Text style={styles.header2}>Connect</Text>
        </Pressable>
        <Ionicons name="bluetooth-outline" size={24} color="#B0E9FF" style={{alignSelf: 'center', marginTop: 20}}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#19173D',
      paddingTop: 20,
    },
    header1: {
      color: '#B0E9FF',
      fontSize: 30,
      marginLeft: 20,
      padding: 20,
    },
    header2: {
      color: '#FFFF',
      fontSize: 15,
      marginLeft: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 3,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
    },
    headset: {
        alignSelf: 'center',
        width: 300,
        height: 200,
        marginTop: 20,
        borderRadius: 20,
    },


  });
  

  export default ConnectScreen;