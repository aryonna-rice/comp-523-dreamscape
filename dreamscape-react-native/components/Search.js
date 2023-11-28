import { View, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import { Input, Button, Text} from '@rneui/themed';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const Search = () => {
    const [deviceId, setDeviceId] = useState('');
    const[searchLast, setSearchLast] = useState('');
    const [searchResults, setSearchResults] = useState({});

    const handleSearch = () => {
        let apiUrl = '';
        if (deviceId) {
          apiUrl = `http://localhost:8000/api/user?device_id=${deviceId}`;
        } else if (searchLast) {
          apiUrl = `http://localhost:8000/api/user/search?last_name=${searchLast}`;
        }
    
        console.log('Searching for patient with:', deviceId ? 'Device ID ' + deviceId : 'Last Name ' + searchLast);
        axios
          .get(apiUrl)
          .then((response) => {
            // Handle success (e.g., display search results)
            if (response.data === null || response.data.length === 0) {
              // If response data is null or empty, display an alert
              Alert.alert('No Results', 'No matching results found.');
            } else {
              // Update search results state
              console.log('Search results:', response.data);
              if (deviceId) {
                setSearchResults(response.data);
              }
              else if (searchLast) {
                setSearchResults(response.data[0]);
              }
            }
            // You can handle the search results as needed for your application
          })
          .catch((error) => {
            // Handle error
            alert('No user found with that Device ID. Please try again.');
            if (error.response) {
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
        <Text style={styles.header2}>Find a Patient</Text>
        <Input
          style={styles.input}  
          placeholder="Device ID"
          value={deviceId}
          onChangeText={text => {
            // Allow editing only if the Device ID field is empty
            if (!searchLast) {
              setDeviceId(text);
            }
          }}
        />
        <Text style={styles.header2}>OR</Text>
        <Input
          style={styles.input}
          placeholder="Last Name"
          value={searchLast}
          onChangeText={text => {
            // Allow editing only if the Device ID field is empty
            if (!deviceId) {
              setSearchLast(text);
            }
          }}
        />
        <Button type="submit" style={styles.search} onPress={handleSearch} ><SearchOutlined /></Button>
        <br></br>
        <FlatList
            horizontal={true}
          data={[searchResults.id, searchResults.first_name, searchResults.last_name, searchResults.dob, searchResults.gender]}
          renderItem={({ item }) => ( 
            <Text style={styles.paragraph}>
              {item}
            </Text>
          )}
        />
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
    search: {
        backgroundColor: '#5A6BFF',
        color: '#FFFFFF',
        padding: 5,
    },
});


export default Search;