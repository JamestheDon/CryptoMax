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

const AddPosition = ({addPosition, switchView}) => {
  // const [positions, addPosition] = useAddPosition();
  // const [positions] = usePositions();
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [qty, setQty] = useState('');
  const [buyDate, setBuyDate] = useState('');

  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log('REGEX', testNums(cost));
  });
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
  /**
   * https://stackoverflow.com/questions/50634651/regex-date-format-for-dash-or-forward-slash
   */
  /*
   * https://stackoverflow.com/questions/2227370/currency-validation
   *
   */

  // const dateRegex = /\d{1,2}[/]\d{1,2}[/]\d{2,4}/;
  // const currencyRegex = /^[0-9]\d*(((,\d{3}){1})?((\.\d{0,2})?(\.\d{8})?))$/;

  onSubmit = (price, cost, qty, buyDate) => {
    if (dateRegex.test(buyDate) == true) {
      return <View>green</View>;
    } else {
      return <View>red</View>;
    }

    console.log('Buy Date', dateRegex.test(buyDate));
    console.log('Price', currencyRegex.test(price));
    console.log('Cost', currencyRegex.test(cost));
    console.log('Qty', currencyRegex.test(qty));
  };

  const testNums = num => {
    // const num = cost;
    const priceRegex = /^[0-9]\d*(((,\d{3}){1})?((\.\d{0,8})?(\.\d{8})?))$/;

    return priceRegex.test(num);
  };
  const testDate = date => {
    // const num = cost;
    const dateRegex = /\d{1,2}[/]\d{1,2}[/]\d{2,4}/;

    return dateRegex.test(date);
  };

  validateNums = data => {};

  return (
    <View stlye={styles.body}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon
            name="currency-btc"
            size={24}
            color={Colors.darkScheme.primary}
          />
          <Input
            clearButtonMode="always"
            placeholder="Price"
            label="BTC Purchase Price"
            labelStyle={styles.inputLabel}
            placeholderTextColor={Colors.darkScheme.light}
            //  containerStyle={styles.containerStyle}
            inputContainerStyle={
              testNums(price) === true
                ? styles.inputContainerStyleSuccess
                : styles.inputContainerStyleFail
            }
            style={styles.input}
            // leftIcon={<Icon name="currency-btc" size={24} color="black" />}
            value={price}
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
            placeholder="0.00"
            label="Amount Invested"
            labelStyle={styles.inputLabel}
            placeholderTextColor={Colors.darkScheme.light}
            // containerStyle={styles.containerStyle}
            inputContainerStyle={
              testNums(cost) === true
                ? styles.inputContainerStyleSuccess
                : styles.inputContainerStyleFail
            }
            //  style={styles.input}
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
            // containerStyle={styles.containerStyle}
            inputContainerStyle={
              testNums(qty) === true
                ? styles.inputContainerStyleSuccess
                : styles.inputContainerStyleFail
            }
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
            label="Date purchased"
            labelStyle={styles.inputLabel}
            placeholderTextColor={Colors.darkScheme.light}
            // containerStyle={styles.containerStyle}
            inputContainerStyle={
              testDate(buyDate) === true
                ? styles.inputContainerStyleSuccess
                : styles.inputContainerStyleFail
            }
            //style={styles.input}
            // leftIcon={<Icon name="calendar-clock" size={24} color="black" />}
            value={buyDate}
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
                backgroundColor: Colors.darkScheme.lighter,
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
              onPress={() => addPosition(price, cost, qty, buyDate)}
              //  onPress={() => onSubmit(price, cost, qty, buyDate)}
            />
          </View>

          {/* <View style={styles.btn}>
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
        </View> */}
          <View style={styles.btn}>
            <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
              {' '}
              back ->{' '}
            </Text>
            <Button
              type="outline"
              // title="Add new postions"
              titleStyle={{color: Colors.darkScheme.primary}}
              buttonStyle={{
                backgroundColor: Colors.darkScheme.lighter,
                borderColor: Colors.darkScheme.secondary,
                borderRightWidth: 3,
                borderBottomWidth: 4,
              }}
              icon={
                <Icon
                  name="space-invaders"
                  size={30}
                  color={Colors.darkScheme.gold}
                />
              }
              // onPress={() => getPosition(item.key)}
              onPress={() => switchView()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 2,
    //  alignItems: 'flex-start',

    //width: '75%',
  },
  container: {
    flex: 0.9,
    padding: 10,
    alignItems: 'flex-start',
    //height: '100%',
    backgroundColor: Colors.darkScheme.light,
  },

  inputContainerStyleSuccess: {
    borderWidth: 1,
    borderColor: Colors.darkScheme.secondary,
    backgroundColor: Colors.darkScheme.lighter,
    height: 30,
  },
  inputContainerStyleFail: {
    borderWidth: 1,
    borderColor: Colors.darkScheme.red,
    backgroundColor: Colors.darkScheme.lighter,
    height: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    margin: 1,
    marginTop: 10,
    height: 40,
    padding: 5,
    // backgroundColor: Colors.darkScheme.dark,
  },
  containerStyle: {},
  inputLabel: {
    color: Colors.darkScheme.primary,
    fontSize: 12,
  },

  btn: {
    width: '33%',

    // marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.light,
  },
  btnTxt: {
    color: Colors.primary,
    // color: 'darkslateblue',
    fontSize: 10,
    textAlign: 'left',
  },
});

export default AddPosition;
