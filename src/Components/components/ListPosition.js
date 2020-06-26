import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Card, Button, ListItem} from 'react-native-elements';

/**
 * @TODO
 * navigate to position details screen from List position
 * add conditional color rendering: red & green
 */

const ListPosition = ({positions, navigation, setPositions}) => {
  /**
   * @description get single Obj's attributes.
   * @param {
   * } key
   */
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

  /**
   * @description get all obj's for single account.
   * @param { key }
   *
   */

  // { if item.price > apiPrice (green) : (red)}

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={positions}
        keyExtractor={position => position.key}
        renderItem={({item}) => {
          return (
            <View style={styles.listPosition}>
              <Card>
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
                <View style={styles.listPositionView}>
                  {/* <Text style={styles.listPositionText}>posKey {item.key}</Text> */}
                  <Text style={styles.listPositionText}>sats: {item.qty}</Text>
                  <Text style={styles.listPositionText}>
                    Buy Date: {item.buyDate}
                  </Text>
                </View>
                <View style={styles.listPositionView}>
                  <Text style={styles.listPositionText}>Cost:{item.cost}</Text>
                  <Text style={styles.listPositionText}>BTC ${item.price}</Text>
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
    marginBottom: 100,
    height: '40%',
  },
  btn: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  listPosition: {
    // backgroundColor: '#f8f8f8',
    borderStyle: 'solid',
    borderColor: '#000',
  },
  listPositionView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
  },
  listPositionText: {
    fontSize: 13,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
  positionBtn: {
    backgroundColor: '#fff',
    padding: 9,
    margin: 5,
  },
});

export default ListPosition;
