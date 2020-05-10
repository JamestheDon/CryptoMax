import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Header} from '../Components/';

const HomeScreenDetails = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Home Screen Detail"
        // isHome={false}
        navigation={navigation}
      />

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen Details</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenDetails;
