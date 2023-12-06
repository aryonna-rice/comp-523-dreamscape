import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
      axios.get('http://localhost:8000/api/user?device_id=0')
      .then((response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setDob(response.data.dob);
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    const userImages = {
      0: require('../assets/user0.png'),
      1: require('../assets/user1.png'),
      2: require('../assets/user2.png'),
    };

    const profilepic = userImages[userId];

    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Patient Profile</Text>
        <View>
          <Image source={profilepic} style={styles.profilepic}/>
        </View>
        <Text style={styles.paragraph}>Name: {firstName} {lastName}</Text>
        <Text style={styles.paragraph}>DOB: {dob}</Text>
        <Text style={styles.paragraph}>User ID: {userId}</Text>
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
      width: 150,
      height: 150,
      borderRadius: 100,
      alignSelf: 'center',
      marginTop: 20,
      borderWidth: 2,
      borderColor: '#B0E9FF',
    },
  });
  

  export default ProfileScreen;