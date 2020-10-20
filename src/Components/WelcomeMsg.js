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
import usePositions from '../hooks/usePositions';
import {Colors} from './index';

const WelcomeMsg = ({switchView, navigation, btc$}) => {
  const [apiResults, positions, setPosition] = usePositions();

  // useEffect(() => {
  //   console.log('BUILD SLow and steady=>', typeof btc, btc);
  // }, [btc]);

  // const setBitcoinPrice = (btc) => {

  //   const btcPrice = [btc]

  //   setCurrentBtcPrice(btcPrice)
  // }

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
      <View style={styles.sectionContainer}>
        <View style={styles.sectionButton}>
          <View style={styles.btn}>
            <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
              {' '}
              New position:
            </Text>
            <Button
              type="outline"
              // title="Add new postions"
              titleStyle={{color: Colors.darkScheme.primary}}
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
              // onPress={() => getPosition(item.key)}
              onPress={() => switchView()}
            />
          </View>
        </View>
        <Text style={styles.sectionDescription}>
          Then you can head over to the details page and get your first look at
          portfolio performance.
        </Text>
        <View style={styles.sectionButton}>
          <View style={styles.btn}>
            <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
              {' '}
              Bitcoin ledger:
            </Text>
            <Button
              //  title="Account Details"
              titleStyle={{color: Colors.darkScheme.primary}}
              buttonStyle={{
                backgroundColor: Colors.darkScheme.lighter,
                borderColor: Colors.darkScheme.secondary,
                borderRightWidth: 2,
                borderBottomWidth: 3,
              }}
              icon={
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="bitcoin"
                    size={30}
                    color={Colors.darkScheme.gold}
                  />
                </View>
              }
              type="outline"
              onPress={() =>
                navigation.navigate('HomeScreenDetails', {
                  data: positions,
                  btc$: btc$,
                })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    //flex: 1,
    //  width: '100%',
    alignItems: 'center',

    //backgroundColor: Colors.darkScheme.light,
    // height: '50%',
    // paddingTop: 5,
  },

  inputContainerStyle: {
    borderWidth: 1,
  },
  sectionDescription: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.darkScheme.primary,
  },
  sectionButton: {
    //  flexDirection: 'row',
  },
  sectionContainer: {
    flex: 1,
    //  marginTop: 20,
    // flexDirection: 'row',
    backgroundColor: Colors.darkScheme.light,
    //paddingTop: 5,

    paddingBottom: 10,
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
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 0,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.light,
  },
  btnTxt: {
    color: Colors.primary,
    // color: 'darkslateblue',
    fontSize: 12,
  },
});

export default WelcomeMsg;
