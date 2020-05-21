import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ListPosition = ({position}) => {
  return (
    <TouchableOpacity style={styles.listPosition}>
      <View style={styles.listPositionView}>
        <Text style={styles.listPositionText}>{position.qty}</Text>
        <Text style={styles.listPositionText}>{position.buyDate}</Text>
        <Text style={styles.listPositionText}>{position.cost}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ListPosition;
