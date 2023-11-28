import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { Header as HeaderRNE } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import { Image, Text} from '@rneui/themed';
import Register from './components/Register';
import Search from './components/Search';
import AllDataTable from './components/AllDataTable';

const logo = require('./assets/logo.png')
const windowWidth = Dimensions.get('window').width;

export default function App() {

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Register />
        <Search />
      </div>
      <form style={styles.form}>
        <Text style={styles.header2}>All Data</Text>
        <br></br>
        <br></br>
          <AllDataTable/>
        <br></br>
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
  form: { 
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    width: '60%',
    backgroundColor: '#292847',
    borderRadius: 10,
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
