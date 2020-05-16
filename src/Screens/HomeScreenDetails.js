import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Header, CalendarHeatmap} from '../Components/';
import {staticData2} from './staticData';
import {ScrollView} from 'react-native-gesture-handler';

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
      <ScrollView>
        <Text>121 Days in quarter.</Text>
        <CalendarHeatmap
          endDate={new Date('2020-04-30')}
          numDays={121} // 121 days for quater
          colorArray={['#eee', '#bcd6f7', '#656ac6', '#393b99', '#191c5c']}
          values={staticData2}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreenDetails;
