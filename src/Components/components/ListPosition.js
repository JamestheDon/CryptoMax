import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

/**
 * @TODO
 * navigate to position details screen from List position
 * add conditional color rendering: red & green
 */

const ListPosition = ({positions, accounts}) => {
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
      // setPositions(prevState => {
      //   return [parsedData, ...prevState];
      // });
      console.log('Position deleted.');
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * @description get all obj's for single account.
   * @param {
   * } key
   */
  // { if item.price > apiPrice (green) : (red)}

  return (
    <View>
      <FlatList
        data={positions}
        keyExtractor={position => position.key}
        renderItem={({item}) => {
          return (
            <View style={styles.listPosition}>
              <TouchableOpacity
                style={styles.positionBtn}
                onPress={() => getPosition(item.key)}>
                <Text style={styles.btnText}>
                  <Icon name="search" size={20} color="green" />
                  Inspect
                </Text>
              </TouchableOpacity>
              <View style={styles.listPositionView}>
                <Text style={styles.listPositionText}>posKey {item.key}</Text>
                <Text style={styles.listPositionText}>BTC qty: {item.qty}</Text>
                <Text style={styles.listPositionText}>
                  Buy date: {item.buyDate}
                </Text>
                <Text style={styles.listPositionText}>
                  USD Cost:{item.cost}
                </Text>
                <Text style={styles.listPositionText}>
                  Buy Price{item.price}
                </Text>
              </View>
              <TouchableOpacity style={styles.positionBtn}>
                <Text style={styles.btnText}>
                  <Icon
                    name="clear"
                    size={20}
                    color="red"
                    onPress={() => removePosition(item.key)}
                  />
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listPosition: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listPositionView: {
    justifyContent: 'space-between',
  },
  listPositionText: {
    fontSize: 18,
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
