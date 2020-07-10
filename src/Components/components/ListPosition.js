import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, Button, ListItem} from 'react-native-elements';
import usePositions from '../../hooks/usePositions';

/**
 * @TODO
 * navigate to position details screen from List position
 * add conditional color rendering: red & green
 */

const ListPosition = ({navigation, positions, setPosition}) => {
  const [apiResults] = usePositions([]);
  const [valueChange, setValueChange] = useState('');
  const currPrice = apiResults.map(i => i.price);
  /**
   * @description get single Obj's attributes.
   * @param {
   * } key
   */
  useEffect(() => {
    console.log(positions);
    // updateTotals();
  }, [positions]);
  // updateTotals = () => {
  //   //  console.log('Money invested', positions.map(i => i.cost));
  //   // const currPrice = apiResults.map(i => i.price);
  //   const currPrice = apiResults.map(i => i.price);
  //   // const sats = positions.map(i => i.qty);
  //   const sumInvest = positions.map(i => i.price);
  //   const returnRate = sumInvest.filter(item => item > 0);
  //   const rOr = ((currPrice[0] - sumInvest[0]) / sumInvest[0]) * 100;
  //   console.log('OTHER STUFFFFFF#$#$# ', rOr);
  //   // const sumSats = sats.reduce((a, b) => a + b, 0).toFixed(8);

  //   //((currPrice - sumInvest) / sumInvest) * 100; = %change
  // };

  // const getAllPositions = async () => {
  //   try {
  //     await AsyncStorage.getAllKeys((err, keys) => {
  //       AsyncStorage.multiGet(keys, (error, stores) => {
  //         stores.map((result, i, store) => {
  //           console.log({[store[i][0]]: store[i][1]});
  //           let parsedData = JSON.parse(store[i][1]);
  //           // console.log(parsedData);
  //           setPosition(prevState => {
  //             return [parsedData, ...prevState];
  //           });
  //           return true;
  //         });
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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

  // { if item.price > apiPrice (green) : (red)}

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={positions}
        keyExtractor={position => position.key}
        renderItem={({item}) => {
          return (
            <View style={styles.listPosition} key={item.key}>
              <Card
                containerStyle={{
                  flexDirection: 'row',
                  padding: 5,

                  height: 90,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.listPositionView}>
                    <Text style={styles.listPositionText}>
                      {' '}
                      ROR: + %{' '}
                      {(
                        ((`${currPrice}` - `${item.price}`) / `${item.price}`) *
                        100
                      ).toFixed(2)}
                    </Text>

                    <Text style={styles.listPositionText}>
                      sats: {item.qty}
                    </Text>
                    <Text style={styles.listPositionText}>
                      Buy Date: {item.buyDate}
                    </Text>
                  </View>
                  <View style={styles.listPositionView}>
                    <Text style={styles.listPositionText}>
                      Cost:{item.cost}
                    </Text>
                    <Text style={styles.listPositionText}>
                      BTC ${item.price}
                    </Text>
                  </View>
                  <View style={styles.listPositionView}>
                    <Button
                      buttonStyle={{padding: 1}}
                      type="clear"
                      icon={<Icon name="bank-minus" size={30} color="red" />}
                      onPress={() => removePosition(item.key)}
                    />
                  </View>
                  {/* <View style={styles.listPositionView}>
                    <Button
                      type="clear"
                      buttonStyle={{padding: 1, margin: 1}}
                      icon={
                        <Icon
                          name="menu-right-outline"
                          size={30}
                          color="green"
                        />
                      }
                      // onPress={() => getPosition(item.key)}
                      onPress={() => navigation.navigate('HomeScreenDetails')}
                    />
                  </View> */}
                </View>
              </Card>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexGrow: 1,
    margin: 20,
    height: '75%',
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
    //   justifyContent: 'space-between',
    // alignContent: 'center',
    // height: 60,
    padding: 5,
  },
  listPositionText: {
    fontSize: 13,
    padding: 5,
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

export default ListPosition;
