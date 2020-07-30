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

const WelcomeMsg = ({view}) => {
  // const [positions, addPosition] = useAddPosition();

  // const [view, setView] = useState(true);

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
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.lighter,
          marginTop: 10,
        }}>
        <Text style={styles.text}>
          {' '}
          Welcome to CryptoMax, a Bitcoin portfolio app.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="bitcoin" color="black" size={20} />
        <Icon name="bitcoin" color="black" size={20} />
        <Icon name="bitcoin" color="black" size={20} />
        <Icon name="bitcoin" color="black" size={20} />
        <Icon name="bitcoin" color="black" size={20} />

        <Text>Get started by adding you first Bitcoin purchase entry.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lighter,
    height: '100%',
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
  inputContainerStyle: {
    borderWidth: 1,
  },
  inputContainer: {
    width: '100%',
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

export default WelcomeMsg;
