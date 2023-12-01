import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

function DataScreen() {
  const [date, setDate] = useState(new Date(1598052030000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Past Data</Text>
        <Text style={styles.paragraph}>Choose a date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <View style={styles.buttons}>
          <Pressable 
              style={({ pressed }) => [{backgroundColor: pressed ? '#B0E9FF' : '#19173D'}, styles.button]}
              onPress={() => alert('Last Night\'s Dream')}
          >
              <Text style={styles.btntext}>Last Night's Dream</Text>
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
    paragraph: {
      color: '#FFFF',
      fontSize: 17,
      marginLeft: 20,
      marginTop: 10,
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
  

  export default DataScreen;