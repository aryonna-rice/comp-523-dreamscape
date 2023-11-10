import { setStatusBarHidden, StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import { Image, Input, Button, ButtonGroup, Text} from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const logo = require('./assets/logo.png')
const windowWidth = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;
const baseUrl = 'http://localhost:8000/api';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [patients, setPatients] = useState([]);
  
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/user', {
            params: {
              device_id: 2002,
            },
          });
          setPatients([response.data]);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };
  
      fetchPatients();
    }, []);
  
  const handleSubmit = () => {
    const patientData = {
      id : 1010,
      first_name: firstName,
      last_name:lastName,
      device_id: 1010,
      dob,
      gender,
    };

    console.log('Submitting patientData:', patientData);

    axios.post('http://localhost:8000/api/user', patientData)
    .then(response => {
      // Handle success (e.g., show a success message, navigate to a new screen)
      console.log('Patient registered:', response.data);
    })
    .catch(error => {
      // Handle error (e.g., show an error message)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with non-2xx status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
      console.error('Full error object:', error);
    });
  
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
        <Input 
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={text => setGender(text)}
        />
        <Button type="submit" style={styles.submit} title="Submit" titleStyle={{ color: 'white'}} onPress={handleSubmit}></Button>
      </form>
      <form style={styles.form}>
        <Text style={styles.header2}>Find a Patient</Text>
        <Input
          style={styles.input}  
          placeholder="Last Name"
        />
        <Button type="submit" style={styles.search}><SearchOutlined /></Button>
      </form>
      <Text style={styles.header2}>List of Patients:</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.device_id}
        renderItem={({ item }) => (
          <Text style={styles.paragraph}>{`${item.first_name} ${item.last_name}`}</Text>
        )}
      />
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
  search: {
    backgroundColor: '#5A6BFF',
    color: '#FFFFFF',
    width: 40,
  },
  container: {
    backgroundColor: '#19173D',
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
  },
  header2: {
    color: '#5A6BFF',
    fontSize: 24,
    fontFamily: 'Poppins',
  },
  paragraph: {
    color: '#FFFFFF',
    fontSize: 16,
    padding: 10,
    fontFamily: 'Poppins',
  },
  logo: {
    width: 100,
    height: 100,
  },
});
