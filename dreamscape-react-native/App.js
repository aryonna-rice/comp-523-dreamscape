import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import { Image } from '@rneui/themed';

const logo = require('./assets/logo.png')
const windowWidth = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;

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
                <Text style={styles.paragraph}>Find User</Text>
              </View>
          }
            containerStyle={styles.headerContainer}
      />
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: windowWidth/2,
  },
  headerRight: {
    flexDirection: 'row',
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
