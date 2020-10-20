import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Card, Button} from 'react-native-elements';

/**
 * @description get single Obj's attributes.
 * @param {
 * } key
 */
/**
 * @description get all obj's for single account.
 * @param { key }
 *
 */

const QuickListPosition = ({positions, navigation}) => {
  const {key, price, cost, qty} = positions;

  const getPosition = async key => {
    // used for navigation to a positions details page
    if (!key) {
      console.log('something went wrong');
    } else {
      try {
        // ERROR --> 1:AsynceStorage was returning null becuase theres nothing in storage.
        // ERROR --> 2: parsing pos was returning null.
        let pos = await AsyncStorage.getItem(key);
        let parsedData = JSON.parse(pos);

        alert('Take me to the details page!');
        console.log(pos);
      } catch (err) {
        alert(err);
      }
    }
  };

  const removePosition = async key => {
    try {
      await AsyncStorage.removeItem(key);
      setPositions(prevState => {
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
            <View style={styles.listPosition}>
              <Card
                containerStyle={{
                  flexDirection: 'row',
                  padding: 5,

                  height: 75,
                }}>
                {/* <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.btn}>
                    <Button
                      title="Inspect"
                      type="outline"
                      icon={<Icon name="bitcoin" size={20} color="green" />}
                      // onPress={() => getPosition(item.key)}
                      onPress={() => navigation.navigate('PositionsScreen')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                    <Button
                      title="Delete"
                      titleStyle={{color: 'red'}}
                      type="clear"
                      icon={<Icon name="bank-minus" size={20} color="red" />}
                      onPress={() => removePosition(item.key)}
                    />
                  </TouchableOpacity>
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.listPositionView}>
                    {/* <Text style={styles.listPositionText}>posKey {item.key}</Text> */}
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
                  <View style={styles.listPositionView}>
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
                  </View>
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
    height: '40%',
  },
  btn: {
    backgroundColor: '#fff',
  },
  listPosition: {
    // backgroundColor: '#f8f8f8',
    borderStyle: 'solid',
    borderColor: '#000',
  },
  listPositionView: {
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 40,
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

export default QuickListPosition;
