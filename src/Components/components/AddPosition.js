import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../../hooks/usePositions';
import {Button, Input} from 'react-native-elements';
// import {addPositions} from '../../hooks/Positions';
/**
 *
 * @todo
 * PORTFOLIO screen
 *  refactor for hooks
 * convert strings to numbers for processing gains/losses.
 */

const AddPosition = ({accounts, positions, setPositions}) => {
  //
  const [errMsg, apiResults] = usePositions([]);

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

  const addPositions = async (price, cost, qty, buyDate) => {
    /**
     *
     *  @param string Position values
     *
     *  [ ] @todo Robust key solution
     */

    try {
      const pos = {
        // cross ref props with needed portfolio values.
        key: Math.random().toString(),
        price: price,
        cost: cost,
        qty: qty, // bal
        buyDate: buyDate,
        currDate: Date.now(),
      };
      await AsyncStorage.setItem(pos.key, JSON.stringify(pos));
      setPositions(prevState => {
        return [pos, ...prevState];
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.component}>
      <View style={styles.inputContainer}>
        <Text style={styles.btnTxt}>Bitcoin purchase price</Text>
        <Input
          clearButtonMode="always"
          placeholder="$ price of ₿"
          style={styles.input}
          leftIcon={<Icon name="currency-btc" size={24} color="black" />}
          value={price}
          onChangeText={data => setPrice(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.btnTxt}>Dollar amount spent</Text>
        <Input
          clearButtonMode="always"
          placeholder="Amount $ spent"
          style={styles.input}
          leftIcon={<Icon name="currency-usd" size={24} color="black" />}
          value={cost}
          onChangeText={data => setCost(data)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.btnTxt}>Quantity received</Text>
        <Input
          clearButtonMode="always"
          placeholder="Quantity Received?"
          style={styles.input}
          leftIcon={<Icon name="chevron-triple-down" size={24} color="black" />}
          value={qty}
          onChangeText={data => setQty(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.btnTxt}>Date purchased</Text>
        <Input
          clearButtonMode="always"
          placeholder="Date Purchased"
          style={styles.input}
          leftIcon={<Icon name="calendar-clock" size={24} color="black" />}
          value={buyDate}
          onChangeText={data => setBuyDate(data)}
        />
      </View>
      <View style={styles.inputContainer} />
      <TouchableOpacity style={styles.btn}>
        <Button
          title="Add Position"
          type="outline"
          titleStyle={{color: '#72b569'}}
          buttonStyle={{
            backgroundColor: '#596469',
            borderColor: '#fff',

            borderWidth: 1,
          }}
          icon={<Icon name="bank-plus" size={25} color="#72b569" />}
          onPress={() => addPositions(price, cost, qty, buyDate)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  inputContainer: {
    width: '75%',
    alignItems: 'flex-start',
  },

  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    height: 20,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    width: '100%',
    height: 75,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#596469',
  },
  btnTxt: {
    color: 'darkslateblue',
    fontSize: 15,
    textAlign: 'left',
  },
});

export default AddPosition;
