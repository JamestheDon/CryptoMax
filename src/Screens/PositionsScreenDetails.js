'use strict';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
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
 *
 *            @todo style component
 *                @todo if pos === 0 ? "open new positions" : ListPositions
 *            @todo sumPos currState === newState ? dont update : update state
 */

const PositionsScreenDetails = ({route, navigation}) => {
  // Positions state
  const [apiResults, positions, setPosition] = usePositions([]);
  // Single Position details
  const {position, btc$} = route.params;
  const {price, cost, qty, buyDate, currDate} = position;

  // Form fields
  const [newPrice, setPrice] = useState(position.price);
  const [newCost, setCost] = useState(position.cost);
  const [newQty, setQty] = useState(position.qty);
  const [newBuyDate, setBuyDate] = useState(
    new Date(buyDate).toLocaleDateString(),
  );

  useEffect(() => {
    console.log('THESE ARE ADDINF UP', btc$);
  });

  const editPosition = async (newPrice, newCost, newQty, newBuyDate) => {
    try {
      const pos = {
        key: position.key,
        price: parseFloat(newPrice).toFixed(2),
        cost: parseFloat(newCost).toFixed(2),
        qty: parseFloat(newQty).toFixed(8),
        buyDate: new Date(newBuyDate),
        currDate: Date.now(),
      };
      await AsyncStorage.setItem(position.key, JSON.stringify(pos));

      //  console.log('what is wrong here??=>>', JSON.stringify(pos));
      setPosition((prevState) => {
        return [pos, ...prevState];
      });
      navigation.navigate('Home');
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

  const removePosition = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      setPosition((prevState) => {
        return [prevState.filter((i) => i.key != key)]; // remove item from state/list on same screen.
      });
      // setRequestData(new Date());
      navigation.navigate('Home');
      console.log('Position deleted.');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="Position Details" isHome={false} navigation={navigation} />
      <ImageBackground
        accessibilityRole={'image'}
        source={require('../images/Icon-trans.png')}
        style={styles.background}
        imageStyle={styles.logo}>
        <View>
          <View style={styles.detailsStyle}>
            <View style={styles.sectionContainer}>
              <Icon
                name="scale-balance"
                color={Colors.darkScheme.gold}
                size={40}
                style={{marginLeft: 4, marginTop: 20}}
              />

              {/* <Text>{rOr[0]}</Text> */}
            </View>
            <>
              {dollarGain > 0 ? (
                <View style={styles.detailLines}>
                  <Text style={styles.text}>Dollar gain:</Text>
                  <Text>+${dollarGain}</Text>
                </View>
              ) : (
                <View style={styles.detailLines}>
                  <Text style={styles.text}>Dollar gain:</Text>
                  {/** REGEX replace dash with blank space if negative yeild */}
                  <Text>-${dollarGain.replace(/-/g, '')}</Text>
                </View>
              )}
            </>
            <>
              {rateOfReturn > 0 ? (
                <View style={styles.detailLines}>
                  <Text style={styles.text}>Rate of return:</Text>
                  <Text>+{rateOfReturn}%</Text>
                </View>
              ) : (
                <View style={styles.detailLines}>
                  <Text style={styles.text}>Dollar gain:</Text>
                  {/** REGEX replace dash with blank space if negative yeild */}
                  <Text>-{rateOfReturn.replace(/-/g, '')}%</Text>
                </View>
              )}
            </>
            {/* <View style={styles.detailLines}>
              <Text style={styles.text}>Satoshies:</Text>
              <Text> {qty}</Text>
              </View> */}
            {/* <View style={styles.detailLines}>
              <Text style={styles.text}>Dollar cost: </Text>
              <Text>${cost}</Text>
              </View> */}
            {/* <View style={styles.detailLines}>
              <Text style={styles.text}>Btc purchase price:</Text>
              <Text> ${price}</Text>
              </View> */}
           
          </View>
        </View>
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionDescription}>
              Edit or delete details.
            </Text>
          </View>
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
              onChangeText={(data) => setPrice(data)}
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
              onChangeText={(data) => setCost(data)}
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
              onChangeText={(data) => setQty(data)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="calendar-clock"
              size={24}
              color={Colors.darkScheme.primary}
            />
            {/* .toDateString().replace(/^\S+\s/,'') */}
            <Input
              clearButtonMode="always"
              placeholder={new Date(buyDate).toLocaleDateString()}
              label="Date purchased"
              labelStyle={styles.inputLabel}
              placeholderTextColor={Colors.darkScheme.light}
              //  containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              //style={styles.input}
              // leftIcon={<Icon name="calendar-clock" size={24} color="black" />}
              value={newBuyDate}
              onChangeText={(data) => setBuyDate(data)}
            />
          </View>
          <View style={styles.buttonRow}>
            {/* <Text style={{color: '#C0392B', padding: 5}}> Update changes</Text> */}
            <Button
              title="Save"
              type="outline"
              titleStyle={{color: Colors.darkScheme.gold, marginLeft: 5}}
              buttonStyle={styles.buttonSuccess}
              containerStyle={styles.btnContainerSuccess}
              icon={
                <Icon
                  name="text-box-check-outline"
                  size={30}
                  color={Colors.darkScheme.gold}
                />
              }
              onPress={() =>
                editPosition(newPrice, newCost, newQty, newBuyDate)
              }
            />
            <Button
              buttonStyle={styles.buttonFail}
              containerStyle={styles.btnContainerFail}
              titleStyle={{color: Colors.darkScheme.red, marginLeft: 5}}
              title="Delete"
              type="clear"
              icon={
                <Icon
                  name="text-box-remove-outline"
                  size={30}
                  color={Colors.darkScheme.red}
                />
              }
              onPress={() => removePosition(position.key)}
            />
          </View>
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
    flex: 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    //  marginTop: 50,
    //  paddingTop: 10,
    //  height: '75%'

    // backgroundColor: Colors.darkScheme.lighter,
  },
  logo: {
    // opacity: 0.9,
    overflow: 'visible',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',

    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: 6,
    marginTop: 15,
    //  marginBottom: -75,
  },

  sectionContainer: {
    //  marginTop: 32,
    padding: 1,
    // paddingHorizontal: 24,
    // backgroundColor: Colors.darkScheme.lighter,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkScheme.primary,
    marginBottom: 10,
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
    paddingLeft: 10,
    paddingRight: 10,
    // padding: 10,
    //  justifyContent: 'space-evenly',
    backgroundColor: Colors.darkScheme.light,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  btnContainerSuccess: {
    padding: 10,
    // shadowColor: 'rgba(238,130,238, 1)',
    shadowColor: Colors.darkScheme.grey,
    shadowOffset: {height: 4, width: 4}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  buttonSuccess: {
    width: 150,
    backgroundColor: Colors.darkScheme.primary,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: Colors.darkScheme.gold,
  },
  btnContainerFail: {
    padding: 10,
    shadowColor: Colors.darkScheme.grey,
    shadowOffset: {height: 4, width: 4}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  buttonFail: {
    width: 150,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: Colors.darkScheme.red,
    backgroundColor: Colors.darkScheme.primary,
  },

  sectionDivider: {
    backgroundColor: Colors.darkScheme.primary,
    height: 25,
    // width: '100%',
    alignItems: 'center',
    margin: 10,
  },
  sectionDescription: {
    paddingTop: 3,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.white,
  },
  ////////////////////
  detailLines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsStyle: {
    width: 200,
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
