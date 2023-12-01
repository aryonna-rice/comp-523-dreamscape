import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import DataScreen from './components/DataScreen';
import ProfileScreen from './components/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ConnectScreen from './components/ConnectScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Tab.Navigator
    
    initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Data') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        
        tabBarActiveTintColor: '#00D7FF',
        tabBarInactiveTintColor: '#9C98DE',
        tabBarStyle: {
          backgroundColor: '#19173D',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Data" component={DataScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Root" component={Root}/>
        <Stack.Screen name="Connect" component={ConnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19173D',
    justifyContent: 'center',
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
  
});
