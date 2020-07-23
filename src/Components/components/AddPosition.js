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
import {useAddPosition} from '../../hooks/positions';

import {Colors} from '../';

const AddPosition = ({addPosition}) => {
  // const [positions, addPosition] = useAddPosition();
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
      <View style={{flexDirection: 'row', backgroundColor: Colors.light}}>
        <Text>Please enter new position details</Text>
        <Icon name="transfer-down" color="black" size={20} />
      </View>
      <View style={styles.inputContainer}>
        <Input
          clearButtonMode="always"
          placeholder="Price"
          label="BTC Purchase Price"
          labelStyle={{color: Colors.primary}}
          placeholderTextColor={Colors.primary}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          style={styles.input}
          leftIcon={<Icon name="currency-btc" size={24} color="black" />}
          value={price}
          onChangeText={data => setPrice(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          clearButtonMode="always"
          placeholder="0.00"
          label="Amount Invested"
          labelStyle={{color: Colors.primary}}
          placeholderTextColor={Colors.primary}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          style={styles.input}
          leftIcon={<Icon name="currency-usd" size={24} color="black" />}
          value={cost}
          onChangeText={data => setCost(data)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          clearButtonMode="always"
          placeholder="0.0000000"
          label="Satoshies Received"
          labelStyle={{color: Colors.primary}}
          placeholderTextColor={Colors.primary}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          //  style={styles.input}
          leftIcon={<Icon name="chevron-triple-down" size={24} color="black" />}
          value={qty}
          onChangeText={data => setQty(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          clearButtonMode="always"
          placeholder="Date"
          label="Date purchased"
          labelStyle={{color: Colors.primary}}
          placeholderTextColor={Colors.primary}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          //style={styles.input}
          leftIcon={<Icon name="calendar-clock" size={24} color="black" />}
          value={buyDate}
          onChangeText={data => setBuyDate(data)}
        />
        <Button
          title="Add Position"
          type="solid"
          titleStyle={{color: Colors.lighter}}
          buttonStyle={{
            // backgroundColor: '#596469',
            borderColor: Colors.dark,

            borderWidth: 1,
          }}
          icon={<Icon name="bank-plus" size={25} color={Colors.lighter} />}
          onPress={() => addPosition(price, cost, qty, buyDate)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.light,
    height: '100%',
  },
  containerStyle: {},
  inputContainerStyle: {
    borderWidth: 1,
  },
  inputContainer: {
    width: '75%',
    alignItems: 'center',
    marginTop: 15,
    height: 55,
  },

  input: {
    // width: '80%',
    // borderColor: '#ccc',
    // borderWidth: 1,
    height: 10,
    //  padding: 8,
    // fontSize: 13,
  },
  btn: {
    width: '100%',

    alignItems: 'center',
    // backgroundColor: '#596469',
  },
  btnTxt: {
    color: Colors.primary,
    // color: 'darkslateblue',
    fontSize: 15,
    textAlign: 'left',
  },
});

export default AddPosition;
