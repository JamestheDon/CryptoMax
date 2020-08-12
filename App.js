import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import HomeScreen from './src/Screens/HomeScreen';
import HomeScreenDetails from './src/Screens/HomeScreenDetails';
import SplashScreen from 'react-native-splash-screen';
import PositionsScreen from './src/Screens/PositionsScreen';
import PositionsScreenDetails from './src/Screens/PositionsScreenDetails';
import {Colors} from './src/Components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import usePositions from './src/hooks/usePositions';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreenDetails"
        component={HomeScreenDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PositionsScreen"
        component={PositionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PositionsScreenDetails"
        component={PositionsScreenDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" style={{color: 'red'}} />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
