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

const WelcomeMsg = ({switchView, navigation}) => {
  const [apiResults, positions, setPosition] = usePositions();

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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionDescription}>
          Welcome to CryptoMax, a Bitcoin portfolio app. Get started by adding
          you first Bitcoin purchase entry.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionButtons}>
          <View style={styles.btn}>
            <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
              {' '}
              add new position:
            </Text>
            <Button
              type="outline"
              // title="Add new postions"
              titleStyle={{color: Colors.darkScheme.primary}}
              buttonStyle={{
                backgroundColor: Colors.darkScheme.darker,
                borderColor: Colors.darkScheme.secondary,
                borderRightWidth: 2,
                borderBottomWidth: 3,
              }}
              icon={
                <Icon
                  name="bank-plus"
                  size={30}
                  color={Colors.darkScheme.primary}
                />
              }
              // onPress={() => getPosition(item.key)}
              onPress={() => switchView()}
            />

            <Text style={{color: Colors.darkScheme.primary, padding: 5}}>
              {' '}
              details:
            </Text>
            <Button
              //  title="Account Details"
              titleStyle={{color: Colors.darkScheme.primary}}
              buttonStyle={{
                backgroundColor: Colors.darkScheme.darker,
                borderColor: Colors.darkScheme.secondary,
                borderRightWidth: 2,
                borderBottomWidth: 3,
              }}
              icon={
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="bitcoin"
                    size={30}
                    color={Colors.darkScheme.primary}
                  />
                </View>
              }
              type="outline"
              onPress={() =>
                navigation.navigate('HomeScreenDetails', {data: positions})
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
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.dark,
    height: '100%',
    paddingTop: 100,
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
  sectionButtons: {
    //  flexDirection: 'row',
  },
  sectionContainer: {
    width: '100%',
    marginTop: 20,
    // flexDirection: 'row',
    backgroundColor: Colors.darkScheme.dark,
    // padding: 5,

    paddingBottom: 20,
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
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.darker,
  },
  btnTxt: {
    color: Colors.primary,
    // color: 'darkslateblue',
    fontSize: 12,
  },
});

export default WelcomeMsg;
