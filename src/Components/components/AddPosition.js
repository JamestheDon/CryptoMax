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
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import usePositions from '../../hooks/usePositions';
// import {addPositions} from '../../hooks/Positions';
/**
 *
 * @todo
 * id solution
 * [x] clear after submit.
 * convert strings to numbers for processing gains/losses.
 *
 *
 */

const AddPosition = ({accounts, positions, setPositions}) => {
  const [errMsg, apiResults] = usePositions([]);

  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [qty, setQty] = useState('');
  const [buyDate, setBuyDate] = useState('');

  const addPositions = async (price, cost, qty, buyDate) => {
    /**
     *
     * @param string document name
     *  [x] @todo refactor key string value
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
      await AsyncStorage.setItem(accounts[3], JSON.stringify(pos));
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
      <Text>Price of BTC during purchas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          clearButtonMode="always"
          placeholder="Purchase price of BTC?"
          value={price}
          style={styles.input}
          onChangeText={data => setPrice(data)}
        />
      </View>

      <Text>USD Cost in Dollars</Text>
      <TextInput
        clearButtonMode="always"
        placeholder="U$D Cost?"
        value={cost}
        style={styles.input}
        onChangeText={data => setCost(data)}
      />
      <Text>How many Satoshies did you receive</Text>
      <TextInput
        clearButtonMode="always"
        placeholder="Quantity received?"
        value={qty}
        style={styles.input}
        onChangeText={data => setQty(data)}
      />
      <Text>Date of purchased BTC</Text>
      <TextInput
        clearButtonMode="always"
        placeholder="Date purchased?"
        value={buyDate}
        style={styles.input}
        onChangeText={data => setBuyDate(data)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => addPositions(price, cost, qty, buyDate)}>
        <Text style={styles.btnText}>
          <Icon name="add" size={20} color="green" />
          Add Position
        </Text>
      </TouchableOpacity>
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
  inputContainer: {},
  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#fff',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddPosition;
