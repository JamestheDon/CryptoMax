'use strict';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {Card, Button, ListItem} from 'react-native-elements';
import usePositions from '../hooks/usePositions';
import {Colors} from './';
import PositionItem from './PositionItem';

const ListPosition = ({  navigation, btc$}) => {
 const [apiResults,  positions, setPosition, setRequestData, requestData] = usePositions([]);

  const [sortedList, setList] = useState( []);
  // const currPrice = apiResults.map(i => i.price);

  useEffect(() => {
    // console.log('8787&&&&&^^&^&&^^', sortedList);
      sortPositions();
    // return () => {
    //   console.log('Cleaning up sorted positions inside LISTPOSITION');
    // };
  }, [positions]);

  const sortPositions = () => {
    const sortedPositions = positions.map((pos, i) => {
      let position = {
        key: pos.key,
        price: pos.price,
        cost: pos.cost,
        qty: pos.qty,
        buyDate: pos.buyDate,
        currDate: pos.currDate,
      };

      return  position;
    });
      
    setList(() => {
      return  sortedPositions.sort((a, b) => {
        return b.buyDate - a.buyDate;
      });
    });
  
  };
  // { if item.price > apiPrice (green) : (red)}

  // useEffect(() => {
  //   console.log('All positions loaded');
  //   // updateTotals();
  // }, [positions]);
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



  // const removePosition = async key => {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     setPosition(prevState => {
  //       return prevState.filter(i => i.key != key);
  //     });
  //     console.log('Position deleted.');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  
  return (
    <View style={styles.viewContainer}>
      
      <View
        style={styles.column}>
          
        <Text style={styles.text}>Date</Text>
        <Text style={styles.text}>Gain</Text>
        <Text style={styles.text}>Cost</Text>
        <Text style={styles.text}>Price</Text>
        <Text style={styles.text}>Sats</Text>
      </View>
      <FlatList
        data={sortedList}
        keyExtractor={position => position.key}
        renderItem={({item}) => {
          return (
         <View>
     
            <PositionItem
              key={item.key}
              positions={item}
              navigation={navigation}
              setPosition={setPosition}
              btc$={btc$}
            />
            </View>
          );
        }}
      />
      {/* <Button
                  buttonStyle={{padding: 0, margin: 0}}
                  titleStyle={{color: Colors.darkScheme.red, fontSize: 10}}
                  title="delete"
                  type="clear"
                  // icon={<Icon name="delete" size={30} color="red" />}
                  onPress={() => removePosition(positions.key)}
                /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.darkScheme.light,
    // borderRadius: 10,
    // borderColor: Colors.darkScheme.darker,
  },
  column: {
    flexDirection: 'row',

   //  alignSelf: 'stretch',
 //   alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: Colors.darkScheme.primary
  },
  text: {
    textAlign: 'left',
  color: Colors.white,
     fontWeight: '400',
  },
});

export default ListPosition;
