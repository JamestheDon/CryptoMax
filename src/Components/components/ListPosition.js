import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ListPosition = ({position}) => {
  return (
    <TouchableOpacity style={styles.listPosition}>
      <View style={styles.listPositionView}>
        <Text style={styles.listPositionText}>BTC qty: {position.qty}</Text>
        <Text style={styles.listPositionText}>
          Buy date: {position.buyDate}
        </Text>
        <Text style={styles.listPositionText}>USD Cost:{position.cost}</Text>
        <Text style={styles.listPositionText}>Buy Price{position.price}</Text>
      </View>
    </TouchableOpacity>
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
});

export default ListPosition;
