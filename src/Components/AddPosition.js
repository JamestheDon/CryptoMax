'use strict';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
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

  const testAllNums = () => {
    if (testNums(price) && testNums(cost) && testNums(qty) === true) {
      return true
    } else {
      return false
    }
    
  }

  const testNums = (num) => {
    
    const priceRegex = /^[0-9]\d*(((,\d{3}){1})?((\.\d{0,8})?(\.\d{8})?))$/;

    return priceRegex.test(num);
  };
  const testDate = date => {
    // const num = cost;
    const dateRegex = /\d{1,2}[/]\d{1,2}[/]\d{4}/;

    return dateRegex.test(date);
  };

  // validateNums = data => {};

  const onSubmit = () => {
   

    console.log('Buy Date', dateRegex.test(buyDate));
    console.log('Price', currencyRegex.test(price));
    console.log('Cost', currencyRegex.test(cost));
    console.log('Qty', currencyRegex.test(qty));
  };

  return (
    <View stlye={styles.body}>
      <View style={styles.container}>
        <Text>This is where you enter new Bitcoin Position details.</Text>
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
          {}
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
          {testAllNums() === true && testDate(buyDate) === true ? (
          <View>   
            <Button
              // title="add new!"
              type="outline"
              titleStyle={{color: Colors.darkScheme.primary, fontSize: 15}}
              buttonStyle={styles.buttonSuccess}
              containerStyle={styles.btnContainerSuccess}
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
            ) : (
            <View>
              <Button
                // title="add new!"
                type="outline"
                titleStyle={{color: Colors.darkScheme.primary, fontSize: 15}}
                buttonStyle={styles.buttonFail}
                containerStyle={styles.btnContainerFail}
                icon={
                  <Icon
                  name="alert-circle-outline"
                    size={30}
                    color={Colors.darkScheme.red}
                  />
                }
                onPress={() => Alert.alert('Please correct data entries.')}
                //  onPress={() => onSubmit(price, cost, qty, buyDate)}
              />
            </View>)}

              
            <View >
            {/* <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
              {' '}
              back ->{' '}
            </Text> */}
            <Button
              type="outline"
              // title="Add new postions"
              titleStyle={{color: Colors.darkScheme.primary}}
              buttonStyle={styles.buttonSuccess}
              containerStyle={styles.btnContainerSuccess}
              icon={
                <Icon
                  name="bank"
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
  btnContainerSuccess: {
    padding: 10,
    // shadowColor: 'rgba(238,130,238, 1)',
    shadowColor: Colors.darkScheme.gold,
    shadowOffset: { height: 4, width: 4 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 5, //IOS
  },
  buttonSuccess: {
    width: 150,
    backgroundColor: Colors.darkScheme.primary,  
    borderRightWidth: 2, 
    borderBottomWidth: 2, 
    borderColor: Colors.darkScheme.gold
  },
  btnContainerFail: {
    padding: 10,
    shadowColor: Colors.darkScheme.red,
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 3, //IOS
  },
  buttonFail: {
    width: 150,   
    borderRightWidth: 2, 
    borderBottomWidth: 2, 
    borderColor: Colors.darkScheme.red,
    backgroundColor: Colors.darkScheme.light
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
