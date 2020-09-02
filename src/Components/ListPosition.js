import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {Card, Button, ListItem} from 'react-native-elements';
import usePositions from '../hooks/usePositions';
import {Colors} from './';
import PositionItem from './PositionItem';

const ListPosition = ({positions, setPosition, navigation, currPrice}) => {
  // const [apiResults] = usePositions([]); // Bug inside usePositions & positions

  const [sortedList, setList] = useState([]);
  // const currPrice = apiResults.map(i => i.price);
  /**
   * @description get single Obj's attributes.
   * @param {
   * } key
   */
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
      <FlatList
        data={sortedList}
        keyExtractor={position => position.key}
        renderItem={({item}) => {
          return (
            // <Text key={item.key}>{item.buyDate.toLocaleDateString()}</Text>
            <PositionItem
              key={item.key}
              positions={item}
              navigation={navigation}
              setPosition={setPosition}
              currPrice={currPrice}
            />
            // <View style={styles.listPosition} key={item.key}>
            //   <Card containerStyle={styles.containerStyle}>
            //     <View
            //       style={{
            //         flexDirection: 'row',
            //         justifyContent: 'space-between',
            //       }}>
            //       <View style={styles.listPositionView}>
            //         <Text style={styles.listPositionText}>

            //           {(
            //             ((`${currPrice}` - `${item.price}`) / `${item.price}`) *
            //             `${item.cost}`
            //           ).toFixed(2) > 0 ? (
            //             <Text style={styles.gainText}>
            //               Gain: +$
            //               {(
            //                 ((`${currPrice}` - `${item.price}`) /
            //                   `${item.price}`) *
            //                 `${item.cost}`
            //               ).toFixed(2)}
            //             </Text>
            //           ) : (
            //             <Text style={{color: Colors.darkScheme.red}}>
            //               Gain: $
            //               {(
            //                 ((`${currPrice}` - `${item.price}`) /
            //                   `${item.price}`) *
            //                 `${item.cost}`
            //               ).toFixed(2)}
            //             </Text>
            //           )}
            //         </Text>

            //         <Text style={styles.listPositionText}>
            //           {' '}
            //           ROR: + %{' '}
            //           {(
            //             ((`${currPrice}` - `${item.price}`) / `${item.price}`) *
            //             100
            //           ).toFixed(2)}
            //         </Text>
            //       </View>
            //       <View style={styles.listPositionView}>
            //         <Text style={styles.listPositionText}>
            //           Cost:{item.cost}
            //         </Text>
            //         <Text style={styles.listPositionText}>
            //           BTC ${item.price}
            //         </Text>
            //       </View>
            //       <View style={styles.listPositionView}>
            //         <Button
            //           type="clear"
            //           buttonStyle={{padding: 0}}
            //           icon={<Icon name="menu-right" size={30} color="green" />}
            //           // onPress={() => getPosition(item.key)}
            //           onPress={() =>
            //             navigation.navigate('PositionsScreenDetails', {
            //               position: item,
            //             })
            //           }
            //         />
            //         <Button
            //           buttonStyle={{padding: 0, margin: 0}}
            //           titleStyle={{color: Colors.darkScheme.red, fontSize: 10}}
            //           title="delete"
            //           type="clear"
            //           // icon={<Icon name="delete" size={30} color="red" />}
            //           onPress={() => removePosition(item.key)}
            //         />
            //       </View>
            //     </View>
            //   </Card>
            // </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    //  flexGrow: 1,
    margin: 20,
    height: 325,
    backgroundColor: Colors.darkScheme.dark,
    borderRadius: 10,
    // borderColor: Colors.darkScheme.darker,
  },
  containerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: Colors.darkScheme.darkest,
    padding: 1,
    borderRadius: 10,
    height: 60,
    backgroundColor: Colors.darkScheme.darker,
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
    // justifyContent: 'space-between',
    // alignContent: 'center',
    // height: 60,
    padding: 5,
  },
  listPositionText: {
    fontSize: 13,
    padding: 5,
    color: Colors.darkScheme.light,
  },
  gainText: {
    color: Colors.darkScheme.secondary,
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
