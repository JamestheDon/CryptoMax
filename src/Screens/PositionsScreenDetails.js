import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Header, Colors} from '../Components/';
import {Button, Input} from 'react-native-elements';
import {useAddPosition} from '../hooks/positions';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';

import {Alert} from 'react-native';

/**
 *
 * @param {
 *  route: position key } param0
 *
 * @todo add Equity detail
 *       @todo editPosition hook
 *            @todo style component
 *                @todo if pos === 0 ? "open new positions" : ListPositions
 *            @todo sumPos currState === newState ? dont update : update state
 */

const PositionsScreenDetails = ({route, navigation}) => {
  // Positions state
  const [apiResults, positions, setPosition] = usePositions();
  // Single Position details
  const {position, btc$} = route.params;
  const {price, cost, qty, buyDate, currDate} = position;

  // Form fields
  const [newPrice, setPrice] = useState(position.price);
  const [newCost, setCost] = useState(position.cost);
  const [newQty, setQty] = useState(position.qty);
  const [newBuyDate, setBuyDate] = useState(
    position.buyDate.toLocaleDateString(),
  );

  useEffect(() => {
    console.log('THESE ARE ADDINF UP', btc$);
  });

  const editPosition = async (newPrice, newCost, newQty, newBuyDate) => {
    try {
      const pos = {
        key: position.key,
        price: newPrice,
        cost: newCost,
        qty: newQty,
        buyDate: newBuyDate,
        currDate: position.currDate,
      };
      await AsyncStorage.setItem(position.key, JSON.stringify(pos));

      //  console.log('what is wrong here??=>>', JSON.stringify(pos));
      setPosition(prevState => {
        return [pos, ...prevState];
      });
      Alert.alert(`Position edited on: ${pos.buyDate}`);
    } catch (err) {
      console.log('An ERROR has occured', err);
    }
  };

  // Portfolio calculations
  const dollarGain = (
    ((`${btc$}` - `${price}`) / `${price}`) *
    `${cost}`
  ).toFixed(2);

  const rateOfReturn = (((btc$ - price) / price) * 100).toFixed(2);

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

  return (
    <View style={styles.screen}>
      <Header
        title="Position Screen Details"
        isHome={false}
        navigation={navigation}
      />
      <View style={styles.background}>
        <View style={styles.detailsStyle}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}> Full position details</Text>

            {/* <Text>{rOr[0]}</Text> */}
          </View>
          <View style={styles.sectionContainer}>
            <Icon
              name="scale-balance"
              color={Colors.darkScheme.gold}
              size={40}
            />

            {/* <Text>{rOr[0]}</Text> */}
          </View>

          <View style={styles.detailLines}>
            <Text style={styles.text}>Dollar gain:</Text>
            <Text>${dollarGain}</Text>
          </View>
          <View style={styles.detailLines}>
            <Text style={styles.text}>Satoshies:</Text>
            <Text> ${qty}</Text>
          </View>
          <View style={styles.detailLines}>
            <Text style={styles.text}>Dollar cost: </Text>
            <Text>${cost}</Text>
          </View>
          <View style={styles.detailLines}>
            <Text style={styles.text}>Btc purchase price:</Text>
            <Text> ${price}</Text>
          </View>
          <View style={styles.detailLines}>
            <Text style={styles.text}>Rate of Return</Text>
            <Text> {rateOfReturn}</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Icon
              name="currency-btc"
              size={24}
              color={Colors.darkScheme.primary}
            />
            <Input
              clearButtonMode="always"
              placeholder={position.price}
              label="BTC Purchase Price"
              labelStyle={styles.inputLabel}
              placeholderTextColor={Colors.darkScheme.light}
              //  containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              // style={styles.input}
              // leftIcon={<Icon name="currency-btc" size={24} color="black" />}
              value={newPrice}
              onChangeText={data => setPrice(data)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              name="currency-usd"
              size={24}
              color={Colors.darkScheme.primary}
            />
            <Input
              clearButtonMode="always"
              placeholder={position.cost}
              label="Amount Invested"
              labelStyle={styles.inputLabel}
              placeholderTextColor={Colors.darkScheme.light}
              //  containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              //  style={styles.input}
              // leftIcon={<Icon name="currency-usd" size={24} color="black" />}
              value={newCost}
              onChangeText={data => setCost(data)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="chevron-triple-down"
              size={24}
              color={Colors.darkScheme.primary}
            />
            <Input
              clearButtonMode="always"
              placeholder={position.qty}
              label="Satoshies Received"
              labelStyle={styles.inputLabel}
              placeholderTextColor={Colors.darkScheme.light}
              //  containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              //  style={styles.input}
              // leftIcon={<Icon name="chevron-triple-down" size={24} color="black" />}
              value={newQty}
              onChangeText={data => setQty(data)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="calendar-clock"
              size={24}
              color={Colors.darkScheme.primary}
            />

            <Input
              clearButtonMode="always"
              placeholder={position.buyDate.toLocaleDateString()}
              label="Date purchased"
              labelStyle={styles.inputLabel}
              placeholderTextColor={Colors.darkScheme.light}
              //  containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              //style={styles.input}
              leftIcon={<Icon name="calendar-clock" size={24} color="black" />}
              value={newBuyDate}
              onChangeText={data => setBuyDate(data)}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.btn}>
            <Text style={{color: '#C0392B', padding: 5}}> Update changes</Text>
            <Button
              // title="add new!"
              type="outline"
              titleStyle={{color: Colors.darkScheme.primary, fontSize: 15}}
              buttonStyle={{
                // backgroundColor: '#596469',
                borderColor: Colors.darkScheme.secondary,
                borderRightWidth: 2,
                borderBottomWidth: 3,
              }}
              icon={
                <Icon
                  name="bank-plus"
                  size={30}
                  color={Colors.darkScheme.gold}
                />
              }
              onPress={() =>
                editPosition(newPrice, newCost, newQty, newBuyDate)
              }
            />
          </View>
          <Button
            buttonStyle={{padding: 0, margin: 0}}
            titleStyle={{color: Colors.darkScheme.red, fontSize: 10}}
            title="delete"
            type="clear"
            // icon={<Icon name="delete" size={30} color="red" />}
            onPress={() => removePosition(position.key)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 300,

    backgroundColor: Colors.darkScheme.lighter,
  },
  /////////////////////////////
  body: {
    backgroundColor: Colors.darkScheme.light,
    flex: 2,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 0.9,
    padding: 10,
    //  justifyContent: 'space-evenly',
    backgroundColor: Colors.darkScheme.light,
  },
  inputContainer: {
    flexDirection: 'row',
    //flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    margin: 1,
    height: 40,
    padding: 5,
    backgroundColor: Colors.darkScheme.light,
  },
  inputContainerStyle: {
    borderWidth: 1,
    backgroundColor: Colors.darkScheme.lighter,
    height: 30,
  },
  sectionContainer: {
    //  marginTop: 32,
    padding: 1,
    // paddingHorizontal: 24,
    backgroundColor: Colors.darkScheme.lighter,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ////////////////////
  detailLines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsStyle: {
    width: '75%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkScheme.primary,
  },
  ////////////////////////////////

  containerStyle: {
    backgroundColor: Colors.darkScheme.lighter,
    height: '80%',
  },
  //////////////////////////
  inputLabel: {
    color: Colors.darkScheme.primary,
    fontSize: 12,
  },

  text: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.darkScheme.primary,
  },
});

export default PositionsScreenDetails;
