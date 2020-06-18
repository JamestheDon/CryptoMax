import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ListPosition} from '../../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../../hooks/usePositions';
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

  /**
   *
   * AsyncStorage.clear();
   *
   */

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text>Price of BTC during purchas</Text>
        <TextInput
          clearButtonMode="always"
          placeholder="Purchase price of BTC?"
          value={price}
          style={styles.input}
          onChangeText={data => setPrice(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>USD Cost in Dollars</Text>
        <TextInput
          clearButtonMode="always"
          placeholder="U$D Cost?"
          value={cost}
          style={styles.input}
          onChangeText={data => setCost(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>How many Satoshies did you receive</Text>
        <TextInput
          clearButtonMode="always"
          placeholder="Quantity received?"
          value={qty}
          style={styles.input}
          onChangeText={data => setQty(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Date of purchased BTC</Text>
        <TextInput
          clearButtonMode="always"
          placeholder="Date purchased?"
          value={buyDate}
          style={styles.input}
          onChangeText={data => setBuyDate(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => addPositions(price, cost, qty, buyDate)}>
          <Icon name="bank-plus" size={30} color="green" />
        </TouchableOpacity>
      </View>
      {/* <View>
        <FlatList
          data={positions}
          keyExtractor={position => position.key}
          renderItem={({item}) => {
            return <ListPosition position={item} />;
          }}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    width: '75%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddPosition;
