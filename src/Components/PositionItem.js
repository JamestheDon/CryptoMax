import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {Card, Divider} from 'react-native-elements';
import usePositions from '../hooks/usePositions';
import {Colors} from './';

const PositionItem = ({positions, navigation, setPosition, btc$}) => {
  // console.log('right here biah', positions);
const {} = positions
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

//   dateTimeReviver = function (key, value) {
//     var a;
//     if (typeof value === 'string') {
//         a = /\/Date\((\d*)\)\//.exec(value);
//         if (a) {
//             return new Date(+a[1]);
//         }
//     }
//     return value;
// }

  return (
    <View style={styles.listPosition} key={positions.key}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PositionsScreenDetails', {
            position: positions,
            btc$: btc$,
          })
        }>
        <View style={styles.containerStyle}>
          <View style={styles.listPositionView}>
              {/* <Button
                    type="clear"
                    buttonStyle={{padding: 0}}
                    icon={<Icon name="menu-right" size={30} color="green" />}
                    // onPress={() => getPosition(positions.key)}
                    onPress={() =>
                      navigation.navigate('PositionsScreenDetails', {
                        position: positions,
                      })
                    }
                    
                  /> */}
{/* .toDateString().replace(/^\S+\s/,'') */}
              <Text style={styles.listPositionText}>
                {/* <Icon
                  name="calendar-star"
                  size={20}
                  color={Colors.darkScheme.primary}
                /> */}
                {new Date(positions.buyDate).toLocaleDateString()}
              </Text>
            </View>
          <View style={styles.listPositionView}>
            <Text style={styles.listPositionText}>
              {/**(cost) x (1 + ror) */}
              {(
                ((`${btc$}` - `${positions.price}`) / `${positions.price}`) *
                `${positions.cost}`
              ).toFixed(2) > 0 ? (
                <>
                  <Icon
                    name="scale-balance"
                    color={Colors.darkScheme.primary}
                    size={20}
                  />{' '}
                  <Text style={styles.gainText}>
                    $+
                    {(
                      ((`${btc$}` - `${positions.price}`) /
                        `${positions.price}`) *
                      `${positions.cost}`
                    ).toFixed(2)}
                  </Text>
                </>
              ) : (
                <>
                  <Icon
                    name="scale-balance"
                    color={Colors.darkScheme.primary}
                    size={20}
                  />
                  {'  '}
                  <Text style={styles.lossText}>
                    ${''}
                    {(
                      ((`${btc$}` - `${positions.price}`) /
                        `${positions.price}`) *
                      `${positions.cost}`
                    ).toFixed(2)}
                  </Text>
                </>
              )}
            </Text>
          </View>

    

          <View style={styles.listPositionView}>
            <Text style={styles.listPositionText}>
              {' '}
              <Icon
                name="currency-usd"
                size={20}
                color={Colors.darkScheme.primary}
              />
              {positions.cost}
            </Text>
          </View>

          <View style={styles.listPositionView}>
            <Text style={styles.listPositionText}>
              {' '}
              <Icon
                name="currency-btc"
                size={20}
                color={Colors.darkScheme.primary}
              />
              {positions.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

    // backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    //  borderColor: Colors.darkScheme.light,
  },
  containerStyle: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',

    // alignContent: 'center',
    //  shadowColor: 'rgba(0,0,0, .2)',
    // shadowOffset: {height: 1, width: 1},
    // shadowOpacity: 1, //default is 1
    // shadowRadius: 0, //default is 1
    width: '100%',
    borderColor: Colors.darkScheme.dark,
    // padding: 1,
    //  borderRadius: 10,
    // margin: 0,
    backgroundColor: Colors.darkScheme.lighter,
  },

  listPositionView: {
    flex: 1,
    alignSelf: 'stretch',
  },

  btn: {
    backgroundColor: '#fff',
  },

  listPositionText: {
    margin: 2,
    fontSize: 12,
    //padding: ,
    color: Colors.darkScheme.dark,
  },
  gainText: {
    color: Colors.darkScheme.secondary,
  },
  lossText: {
    color: Colors.darkScheme.red,
  },

  btnText: {
    color: 'darkslateblue',
    fontSize: 10,
    textAlign: 'center',
  },
  positionBtn: {
    backgroundColor: '#fff',
    padding: 9,
    // margin: 5,
  },
});

export default PositionItem;
