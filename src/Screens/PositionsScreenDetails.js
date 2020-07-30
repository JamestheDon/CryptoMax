import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Header, Colors} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';

import {Alert} from 'react-native';

const PositionsScreenDetails = ({route, navigation}) => {
  const [apiResults] = usePositions([]);
  const {position} = route.params;
  const currPrice = apiResults.map(i => i.price);
  const {price, cost, qty} = position;
  console.log('%%%%%%%@%@%%#%#^#$^#$^', position);

  const dollarGain = (
    ((`${currPrice}` - `${price}`) / `${price}`) *
    `${cost}`
  ).toFixed(2);

  const rateOfReturn = (((currPrice - price) / price) * 100).toFixed(2);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Position Screen Details"
        isHome={false}
        navigation={navigation}
      />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '40%',
        }}>
        <Text>Position details</Text>
        <Text>
          {' '}
          {(((`${currPrice}` - `${price}`) / `${price}`) * `${cost}`).toFixed(
            2,
          )}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Icon name="scale-balance" color="black" size={20} />
          <Text style={styles.sectionTitle}>{dollarGain}</Text>
          <Text> {qty}</Text>
          <Text style={styles.sectionTitle}>{rateOfReturn}</Text>
          {/* {ror > 0 ? (<Text>+ {ror}% green</Text>) : (<Text>{ror}% red</Text>)} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default PositionsScreenDetails;
