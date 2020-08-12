import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';
import {useAddPosition} from '../hooks/positions';

import {Colors} from './index';

const AddPosition = ({addPosition, navigation, positions, switchView}) => {
  // const [positions, addPosition] = useAddPosition();
  // const [positions] = usePositions();
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [qty, setQty] = useState('');
  const [buyDate, setBuyDate] = useState('');

  const [index, setIndex] = useState(0);

  // store in Async Storage
  //   const AccountIndex = () => {
  // const acct = {count: index[i]}
  //     // set indexx in storage
  // // get index from storage
  // // if key is > 0; ++
  // // update state with account # count.
  // try {
  //   await AsyncStorage.setItem(index, JSON.stringify(pos));
  // } catch (err) {}
  //      setIndex(prevState => {
  //        return prevState + 1
  //      })
  //   }

  return (
    <View style={styles.component}>
      <View style={styles.inputContainer}>
        <Icon name="currency-btc" size={24} color={Colors.darkScheme.primary} />
        <Input
          clearButtonMode="always"
          placeholder="Price"
          label="BTC Purchase Price"
          labelStyle={styles.inputLabel}
          placeholderTextColor={Colors.darkScheme.light}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          style={styles.input}
          // leftIcon={<Icon name="currency-btc" size={24} color="black" />}
          value={price}
          onChangeText={data => setPrice(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="currency-usd" size={24} color={Colors.darkScheme.primary} />
        <Input
          clearButtonMode="always"
          placeholder="0.00"
          label="Amount Invested"
          labelStyle={styles.inputLabel}
          placeholderTextColor={Colors.darkScheme.light}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          style={styles.input}
          // leftIcon={<Icon name="currency-usd" size={24} color="black" />}
          value={cost}
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
          placeholder="0.0000000"
          label="Satoshies Received"
          labelStyle={styles.inputLabel}
          placeholderTextColor={Colors.darkScheme.light}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          //  style={styles.input}
          // leftIcon={<Icon name="chevron-triple-down" size={24} color="black" />}
          value={qty}
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
          placeholder="Date"
          // label="Date purchased"
          labelStyle={styles.inputLabel}
          placeholderTextColor={Colors.darkScheme.light}
          // containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          //style={styles.input}
          // leftIcon={<Icon name="calendar-clock" size={24} color="black" />}
          value={buyDate}
          onChangeText={data => setBuyDate(data)}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            onPress={() => addPosition(price, cost, qty, buyDate)}
          />
        </View>

        <View style={styles.btn}>
          <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
            {' '}
            details:
          </Text>
          <Button
            //  title="Account Details"
            buttonStyle={{
              borderColor: Colors.darkScheme.darkest,
              // backgroundColor: Colors.darkScheme.secondary,
              borderBottomWidth: 4,
              borderRightWidth: 3,
            }}
            type="outline"
            icon={
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="bitcoin"
                  size={30}
                  color={Colors.darkScheme.primary}
                />
              </View>
            }
            // onPress={() => getPosition(item.key)}
            onPress={() =>
              navigation.navigate('HomeScreenDetails', {data: positions})
            }
          />
        </View>
        <View style={styles.btn}>
          <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
            {' '}
            Home:
          </Text>
          <Button
            type="outline"
            // title="Add new postions"
            titleStyle={{color: Colors.darkScheme.primary}}
            buttonStyle={{
              backgroundColor: Colors.darkScheme.darker,
              borderColor: Colors.darkScheme.darkest,
              borderRightWidth: 3,
              borderBottomWidth: 4,
            }}
            icon={
              <Icon
                name="space-invaders"
                size={30}
                color={Colors.darkScheme.primary}
              />
            }
            // onPress={() => getPosition(item.key)}
            onPress={() => switchView()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    paddingTop: 10,
    alignItems: 'center',
    height: 500,
    backgroundColor: Colors.darkScheme.dark,
  },
  containerStyle: {},
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
  btn: {
    width: '33%',
    padding: 20,
    // marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.dark,
  },
  btnTxt: {
    color: Colors.primary,
    // color: 'darkslateblue',
    fontSize: 10,
    textAlign: 'left',
  },
});

export default AddPosition;
