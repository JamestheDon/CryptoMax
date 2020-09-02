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

const PositionsScreenDetails = ({route, navigation}) => {
  // Positions state
  const [apiResults, positions, setPosition] = usePositions();
  // Single Position details
  const {position} = route.params;
  const {price, cost, qty, buyDate} = position;
  const key = position.key;
  // Current Bitcoin price in $
  // const [apiResults] = usePositions([]);
  const currPrice = apiResults.map(i => i.price);
  // Form fields
  const [newPrice, setPrice] = useState(position.price);
  const [newCost, setCost] = useState(position.cost);
  const [newQty, setQty] = useState(position.qty);
  const [newBuyDate, setBuyDate] = useState(
    position.buyDate.toLocaleDateString(),
  );

  console.log('%%%%%%%@%@%%#%#^#$^#$^', route);

  const editPosition = async (key, newPrice, newCost, newQty, newBuyDate) => {
    try {
      const pos = {
        key: key,
        price: newPrice,
        cost: newCost,
        qty: newQty,
        buyDate: newBuyDate,
      };
      await AsyncStorage.setItem(pos.key, JSON.stringify(pos));

      setPosition(prevState => {
        return [pos, ...prevState];
      });
      Alert.alert(`Position created: ${pos.currDate}`);
    } catch (err) {
      console.log('An ERROR has occured', err);
    }
  };

  // Portfolio calculations
  const dollarGain = (
    ((`${currPrice}` - `${price}`) / `${price}`) *
    `${cost}`
  ).toFixed(2);

  const rateOfReturn = (((currPrice - price) / price) * 100).toFixed(2);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Position Screen Details"
        isHome={false}
        navigation={navigation}
      />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '20%',
        }}>
        <Text>Position details</Text>
        <Text>
          {' '}
          {(((`${currPrice}` - `${price}`) / `${price}`) * `${cost}`).toFixed(
            2,
          )}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Icon name="scale-balance" color="black" size={20} />
          <Text style={styles.sectionTitle}>{dollarGain}</Text>
          <Text> {qty}</Text>
          <Text style={styles.sectionTitle}>{rateOfReturn}</Text>
          {/* {ror > 0 ? (<Text>+ {ror}% green</Text>) : (<Text>{ror}% red</Text>)} */}
        </View>
      </View>
      <View style={styles.component}>
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
            containerStyle={styles.containerStyle}
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
            containerStyle={styles.containerStyle}
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
            containerStyle={styles.containerStyle}
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
            // label="Date purchased"
            labelStyle={styles.inputLabel}
            placeholderTextColor={Colors.darkScheme.light}
            // containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            //style={styles.input}
            // leftIcon={<Icon name="calendar-clock" size={24} color="black" />}
            value={newBuyDate}
            onChangeText={data => setBuyDate(data)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.btn}>
            <Text style={{color: '#C0392B', padding: 5}}> add new!</Text>
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
                  color={Colors.darkScheme.primary}
                />
              }
              onPress={() => editPosition(price, cost, qty, buyDate)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center',
    margin: 15,
    height: 50,
    // backgroundColor: Colors.darkScheme.dark,
  },

  inputLabel: {
    color: Colors.darkScheme.primary,
  },
  body: {
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
  },
});

export default PositionsScreenDetails;
