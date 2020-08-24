import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {Card, Button, ListItem} from 'react-native-elements';
import usePositions from '../hooks/usePositions';
import {Colors} from './';

const PositionItem = ({positions, navigation, setPosition}) => {
  const [apiResults] = usePositions(); // Bug inside usePositions & positions

  const currPrice = apiResults.map(i => i.price);

  const removePosition = async key => {
    try {
      await AsyncStorage.removeItem(key);
      setPosition(prevState => {
        return prevState.filter(i => i.key != key);
      });
      console.log('Position deleted.');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      {/* <Text>Position item{positions.buyDate.toLocaleDateString()}</Text> */}
      <View style={styles.listPosition} key={positions.key}>
        <Card containerStyle={styles.containerStyle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.listPositionView}>
              <Text style={styles.listPositionText}>
                {' '}
                {/**(cost) x (1 + ror) */}
                {(
                  ((`${currPrice}` - `${positions.price}`) /
                    `${positions.price}`) *
                  `${positions.cost}`
                ).toFixed(2) > 0 ? (
                  <Text style={styles.gainText}>
                    Gain: +$
                    {(
                      ((`${currPrice}` - `${positions.price}`) /
                        `${positions.price}`) *
                      `${positions.cost}`
                    ).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={{color: Colors.darkScheme.red}}>
                    Gain: $
                    {(
                      ((`${currPrice}` - `${positions.price}`) /
                        `${positions.price}`) *
                      `${positions.cost}`
                    ).toFixed(2)}
                  </Text>
                )}
              </Text>

              <Text style={styles.listPositionText}>
                {' '}
                ROR: + %{' '}
                {(
                  ((`${currPrice}` - `${positions.price}`) /
                    `${positions.price}`) *
                  100
                ).toFixed(2)}
              </Text>
            </View>
            <View style={styles.listPositionView}>
              <Text style={styles.listPositionText}>Cost:{positions.cost}</Text>
              <Text style={styles.listPositionText}>
                BTC ${positions.price}
              </Text>
            </View>
            <View style={styles.listPositionView}>
              <Button
                type="clear"
                buttonStyle={{padding: 0}}
                icon={<Icon name="menu-right" size={30} color="green" />}
                // onPress={() => getPosition(positions.key)}
                onPress={() =>
                  navigation.navigate('PositionsScreenDetails', {
                    position: positions,
                  })
                }
              />
              <Button
                buttonStyle={{padding: 0, margin: 0}}
                titleStyle={{color: Colors.darkScheme.red, fontSize: 10}}
                title="delete"
                type="clear"
                // icon={<Icon name="delete" size={30} color="red" />}
                onPress={() => removePosition(positions.key)}
              />
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    //  flexGrow: 1,
    margin: 20,
    height: 325,
    backgroundColor: Colors.darkScheme.dark,
    borderRadius: 10,
    // borderColor: Colors.darkScheme.darker,
  },
  containerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: Colors.darkScheme.darkest,
    padding: 1,
    borderRadius: 10,
    height: 60,
    backgroundColor: Colors.darkScheme.darker,
  },
  btn: {
    backgroundColor: '#fff',
  },
  listPosition: {
    // backgroundColor: '#f8f8f8',
    borderStyle: 'solid',
    borderColor: '#fff',
  },
  listPositionView: {
    // justifyContent: 'space-between',
    // alignContent: 'center',
    // height: 60,
    padding: 5,
  },
  listPositionText: {
    fontSize: 13,
    padding: 5,
    color: Colors.darkScheme.light,
  },
  gainText: {
    color: Colors.darkScheme.secondary,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 10,
    textAlign: 'center',
  },
  positionBtn: {
    backgroundColor: '#fff',
    padding: 9,
    margin: 5,
  },
});

export default PositionItem;
