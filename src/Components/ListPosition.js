import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {Card, Button, ListItem} from 'react-native-elements';
import usePositions from '../hooks/usePositions';
import {Colors} from './';
import PositionItem from './PositionItem';

const ListPosition = ({positions, setPosition, navigation, btc$}) => {
  // const [apiResults] = usePositions([]); // Bug inside usePositions & positions

  const [sortedList, setList] = useState([]);
  // const currPrice = apiResults.map(i => i.price);

  useEffect(() => {
    // console.log('8787&&&&&^^&^&&^^', sortedList);
    sortPositions();
    return () => {
      console.log('Cleaning up sorted positions');
    };
  }, [positions]);

  sortPositions = () => {
    const sortedPositions = positions.map((pos, i) => {
      const position = {
        key: pos.key,
        price: pos.price,
        cost: pos.cost,
        qty: pos.qty,
        buyDate: new Date(pos.buyDate),

        currDate: pos.currDate,
      };

      return position;
    });

    const list = sortedPositions.sort((a, b) => {
      return b.buyDate - a.buyDate;
    });
    // const list = sortedPositions.sort((a, b) =>
    //   a.buyDate.localeCompare(b.buyDate),
    // );

    console.log('LOOOOOOOOOKHERER', list);

    setList(list);
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
        style={{
          flexDirection: 'row',
          //  alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.text}>Dollar gain</Text>
        <Text style={styles.text}>Purchase Date</Text>
        <Text style={styles.text}>Dollar Cost</Text>
        <Text style={styles.text}>Btc Price</Text>
      </View>
      <FlatList
        data={sortedList}
        keyExtractor={position => position.key}
        renderItem={({item}) => {
          return (
            <PositionItem
              key={item.key}
              positions={item}
              navigation={navigation}
              setPosition={setPosition}
              btc$={btc$}
            />
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
  text: {
    padding: 10,
    paddingLeft: 5,
    paddingRight: 5,
    // margin: 2,
    fontWeight: '200',
  },
});

export default ListPosition;
