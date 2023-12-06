import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

function DataScreen() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Sleep Data</Text>
        <Text style={styles.paragraph}>Choose a date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          onChange={onChange}
          is24Hour={true}
          style={styles.datepicker}
        />
        <View style={styles.selectedData}>
          <Text style={styles.paragraph}>Your dream from {formattedDate}</Text>
          <Image source={require('../assets/cat.png')} style={styles.dreamimg}/>
          <Image source={require('../assets/nyc.png')} style={styles.dreamimg}/>
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
    selectedData:{
      flex: 1,
      backgroundColor: '#262450',
      paddingTop: 20,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      marginTop: 20,
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
  datepicker: {
    alignSelf: 'center',
    backgroundColor: '#B0E9FF',
    borderRadius: 10,
    marginTop: 10,
  },
  dreamimg: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  
  });
  

  export default DataScreen;