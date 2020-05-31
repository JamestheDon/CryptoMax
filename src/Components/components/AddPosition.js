import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ListPosition} from '../../Components/';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import usePositions from '../../hooks/usePositions';
// import {addPositions} from '../../hooks/Positions';

const AddPosition = () => {
  const [errMsg, apiResults, addPositions] = usePositions([]);

  const [positions, setPositions] = useState([
    {
      name: 'BTC',
      price: 8649.76,
      cost: 99.91,
      qty: 0.01155011,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 11:49 AM ET',
    },
    {
      name: 'BTC',
      price: 8696.93,
      cost: 99.83,
      qty: 0.0114779,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 12:08',
    },
  ]);

  //   //$$ Spent
  //   const onChange = inputValue =>
  //     setPosition(inputValue => {
  //       return [
  //         {
  //           name: 'BTC',
  //           price: '',
  //           cost: null,
  //           qty: null,
  //           currDate: Date.now(),
  //           buyDate: '',
  //         },
  //       ];
  //     });
  const [price, setPrice] = useState();
  const [cost, setCost] = useState();
  const [qty, setQty] = useState();
  const [buyDate, setBuyDate] = useState();

  const submitHandler = (price, cost, qty, buyDate) => {
    setPositions(prevState => {
      return [
        {
          price: price,
          cost: cost,
          qty: qty,
          buyDate: buyDate,
          key: Math.random().toString(),
        },
        ...prevState,
      ];
    });
  };

  //   useEffect(() => {
  //     addPosition()
  //   }, []);

  return (
    <View>
      <Text>Price of BTC during purchas</Text>
      <TextInput
        placeholder="Purchase price of BTC?"
        value={price}
        style={styles.input}
        onChangeText={data => setPrice(data)}
      />
      <Text>USD Cost in Dollars</Text>
      <TextInput
        placeholder="U$D Cost?"
        value={cost}
        style={styles.input}
        onChangeText={data => setCost(data)}
      />
      <Text>How many Satoshies did you receive</Text>
      <TextInput
        placeholder="Quantity received?"
        value={qty}
        style={styles.input}
        onChangeText={data => setQty(data)}
      />
      <Text>Date of purchased BTC</Text>
      <TextInput
        placeholder="Date purchased?"
        value={buyDate}
        style={styles.input}
        onChangeText={data => setBuyDate(data)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => submitHandler(price, cost, qty, buyDate)}>
        <Text style={styles.btnText}>
          <Icon name="add" size={20} color="green" />
          Add Position
        </Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={positions}
          keyExtractor={position => position.qty.toString()}
          renderItem={({item}) => {
            return <ListPosition position={item} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
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
