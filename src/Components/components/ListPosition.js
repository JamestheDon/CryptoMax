import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

/**
 * @TODO
 * navigate to position details screen from List position
 *
 */

const ListPosition = ({position}) => {
  const getPositions = async key => {
    if (!key) {
      console.log('something went wrong');
    } else {
      try {
        // ERROR --> 1:AsynceStorage was returning null becuase theres nothing in storage.
        // ERROR --> 2: parsing pos was returning null.
        let pos = await AsyncStorage.getItem(key);
        let parsedData = JSON.parse(pos);

        // setPositions(prevState => {
        //   return [parsedData, ...prevState];
        // });
        alert('Take me to the details page!');
        console.log(pos);
      } catch (err) {
        alert(err);
      }
    }
  };

  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({[store[i][0]]: store[i][1]});
        return true;
      });
    });
  });
  return (
    <View style={styles.listPosition}>
      <TouchableOpacity
        style={styles.positionBtn}
        onPress={() => getPositions(position.key)}>
        <Text style={styles.btnText}>
          <Icon name="search" size={20} color="green" />
          Inspect
        </Text>
      </TouchableOpacity>
      <View style={styles.listPositionView}>
        <Text style={styles.listPositionText}>posKey {position.key}</Text>
        <Text style={styles.listPositionText}>BTC qty: {position.qty}</Text>
        <Text style={styles.listPositionText}>
          Buy date: {position.buyDate}
        </Text>
        <Text style={styles.listPositionText}>USD Cost:{position.cost}</Text>
        <Text style={styles.listPositionText}>Buy Price{position.price}</Text>
      </View>
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
