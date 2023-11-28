import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Input, Button, Text} from '@rneui/themed';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
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
      const handleSubmit = () => {
        const patientData = {
          id : Math.floor(Math.random() * 200),
          first_name: firstName,
          last_name:lastName,
          device_id: Math.floor(Math.random() * 200),
          dob,
          gender,
        };
    
        console.log('Submitting patientData:', patientData);
        setFirstName('');
        setLastName('');
        setDOB('');
        setGender('');
    
        axios.post('http://localhost:8000/api/user', patientData)
        .then(response => {
          // Handle success (e.g., show a success message, navigate to a new screen)
          console.log('Patient registered:', response.data);
          alert('Patient registered successfully! Device ID:' + response.data.device_id)})
        .catch(error => {
          // Handle error (e.g., show an error message)
          alert('Error registering patient. Please try again.');
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
    return (
      <View>
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
      </View>
    );
}

const styles = StyleSheet.create({
    form: { 
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: '#292847',
        borderRadius: 10,
        height: 300,
        width: 450,
      },
    input: {
        color: '#FFFFFF',
    },
    submit: {
        backgroundColor: '#5A6BFF',
        color: '#FFFFFF',
        margin: 10,
    },
    header2: {
        color: '#5A6BFF',
        fontSize: 24,
        fontFamily: 'Poppins',
      },

});

export default Register;
