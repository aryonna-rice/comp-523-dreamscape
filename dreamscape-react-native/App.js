import { setStatusBarHidden, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import { Image, Input, Button, ButtonGroup } from '@rneui/themed';
import React, { useState } from 'react';


const logo = require('./assets/logo.png')
const windowWidth = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;


export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [caregiver, setCaregiver] = useState('')
  const handleSubmit = () => {
    setFirstName('');
    setLastName('');
    setDOB('');
    setCaregiver('');
  };

  const formatDOB = (input) => {
    if (input.length <= 10) {
      // Remove any non-numeric characters
      const numericInput = input.replace(/\D/g, '');

      if (numericInput.length <= 2) {
        // Format as MM
        return numericInput;
      } else if (numericInput.length <= 4) {
        // Format as MM/DD
        return `${numericInput.slice(0, 2)}/${numericInput.slice(2)}`;
      } else {
        // Format as MM/DD/YYYY
        return `${numericInput.slice(0, 2)}/${numericInput.slice(2, 4)}/${numericInput.slice(4, 8)}`;
      }
    }
    return input.slice(0, 10);
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
      <HeaderRNE
            leftComponent={
              <View style={styles.headerLeft}>
                <Image
                source={logo}
                containerStyle={styles.logo}
                />
                <Text style={styles.header1}>DreamScape <Text style={styles.header2}>Admin</Text></Text>
              </View>
            }
            rightComponent={
              <View style={styles.headerRight}>
                <Text style={styles.paragraph}>Home</Text> 
                <Text style={styles.paragraph}>All data</Text>
                <Text style={styles.paragraph}>Find Patient</Text>
                <Text style={styles.paragraph}>Register Patient</Text>

              </View>
          }
            containerStyle={styles.headerContainer}
      />
      <form style={styles.form}>
        <Text style={styles.header2}>Register a Patient</Text>
        <Input
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <Input 
          style={styles.input}
          placeholder="Last Name" 
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <Input 
          style={styles.input}
          placeholder="DOB: (MM/DD/YYYY)"
          value={formatDOB(dob)}
          onChangeText={text => setDOB(formatDOB(text))}
        />
        <ButtonGroup
          buttons={['Female', 'Non-Binary', 'Male']}
          selectedButtonStyle={{backgroundColor: '#5A6BFF'}}
          textStyle={{color: '#FFFFFF'}}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={styles.buttonContainer}
        />
        <Input 
          style={styles.input}
          placeholder="Caregiver Name" 
          value={caregiver}
          onChangeText={text => setCaregiver(text)}
        />
        <Button type="submit" style={styles.submit} title="Submit" titleStyle={{ color: 'white'}} onPress={handleSubmit}></Button>
      </form>
      </SafeAreaProvider>
      <StatusBar style="auto" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    backgroundColor: '#19173D',
    borderWidth: .3,
  },
  input: {
    color: '#FFFFFF',
    margin: 5,
  },
  form: { 
    alignSelf: 'center',
    backgroundColor: '#19173D',
    padding: 10,
    margin: 10,
    width: windowWidth/2,
    backgroundColor: '#292847',
    borderRadius: 10,
  },
  submit: {
    backgroundColor: '#5A6BFF',
    color: '#FFFFFF',
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#19173D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: '#19173D',
    width: windowWidth,
    flexDirection: 'row',
    border: 'none',
  },
  headerLeft: {
    flexDirection: 'row',
    width: windowWidth/3,
    padding: 10,
    margin: 10,
  },
  headerRight: {
    flexDirection: 'row',
    width: windowWidth/3,
    padding: 10,
    margin: 10,
  },
  header1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  header2: {
    color: '#5A6BFF',
    fontSize: 24,
  },
  paragraph: {
    color: '#FFFFFF',
    fontSize: 16,
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
