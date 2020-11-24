'use strict';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {Alert} from 'react-native';
import WelcomeMsg from '../Components/WelcomeMsg';
import AddPosition from '../Components/AddPosition';
import {Header, Colors} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';

import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';
import {useAddPosition} from '../hooks/positions';
import Spinner from '../Components/components/Spinner';
// The important things in your life are what you do
// everyday... because you do them everyday. What can i do
// everyday thats easy enough to do withought thought everyday,
// and how can i build upon that in a sustainable way. Repeat, rest, repeat.
// Play with habitual routeins untill you reffine them into prestene shape.
//
// SOMEHITNG you did & SOMETHING you didnt do.

/**
 * @TODO
 *  Clean ../ directory structure
 *
 */

const HomeScreen = ({navigation}) => {
  // const [apiResults, positions, addPosition] = usePositions();
  const [state, addPosition] = useAddPosition();
  const [apiResults, positions, getAllPositions] = usePositions([]);
  // const [positions] = usePositions();
  const [view, setView] = useState(false);
  const [btc$, setBtcPrice] = useState();

  //const btcPrice = apiResults.map(i => parseFloat(i.price).toFixed(2));

  useEffect(() => {
   // getAllPositions()
  //  getAllPositions();
    console.log('START#', positions )
    //  AsyncStorage.clear();
  });

  const testNums = () => {
    const nums = btc$;
    const regex = /^[1-9]\d*(((,\d{3}){1})?((\.\d{0,2})?(\.\d{8})?))$/;

    return regex.test(nums);
  };

 const switchView = () => {
    if (view === true) {
      setView(false);
    } else {
      setView(true);
    }
  };

  // removeFew = async () => {
  //   const keys = ['17056520', '85145104', '52846882'];
  //   try {
  //     await AsyncStorage.multiRemove(keys);
  //   } catch (e) {
  //     // remove error
  //     console.log(e);
  //   }

  //   console.log('Done');
  // };

  // getAllKeys = async () => {
  //   let keys = [];
  //   try {
  //     keys = await AsyncStorage.getAllKeys();
  //   } catch (e) {
  //     // read key error
  //   }

  //   console.log('keys here::=>>', keys);
  //   // example console.log result:
  //   // ['@MyApp_user', '@MyApp_key']
  // };

  // removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem('49827598');
  //   } catch (e) {
  //     // remove error
  //   }

  //   console.log('Done.');
  // };

  useEffect(() => {
    console.log(process.env.NODE_ENV);
  }, [positions]);

  return (
    <View style={styles.screen}>
      <Header title="Ledger Max" isHome={true} navigation={navigation} />
      <View style={styles.introBody}>
      
        
        {/* <Text style={styles.introDescription}>
          The FIRST thing to do is set the current Bitcoin price.
        </Text> */}
       
      </View>

      {view == true ? (
        <View style={styles.body}>
          <AddPosition
            // accounts={accounts}

            addPosition={addPosition}
            switchView={switchView}
          />
        </View>
      ) : (
        <View style={styles.body}>
           <View style={styles.inputSection}>
            
            <Input
              placeholder="10,000.00"
              label="Bitcoin price?"
              labelStyle={
              styles.inputLabel
              }
              containerStyle={styles.inputContainerStyle}
              style={     testNums() === true
                ? styles.inputSuccess
                : styles.inputError}
              value={btc$}
              onChangeText={(data) => setBtcPrice(data)}
            />
        </View>
          <WelcomeMsg
            view={view}
            switchView={switchView}
            navigation={navigation}
            btc$={btc$}
            testNums={testNums}
            positions={state}
          />
        </View>
      )}

      {/* <ListPosition positions={positions} navigation={navigation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.darkScheme.lighter,
    //height: '100%',
    width: '100%',
  },

  body: {
    flex: 3,
   // marginTop: '5%',
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.light,
  },
  introBody: {
    flex: 1,
  //  marginTop: 30,
    // height: '20%',
  },
  introDescription: {
    margin: 15,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.darkScheme.primary,
  },
  inputSection: {
    width: '100%',
  //  marginBottom: 10,
  //  marginTop: 15,
    padding: 10
  }, 
  inputContainerStyle: {
   // backgroundColor: Colors.darkScheme.lighter
  },
  inputSuccess: {
  
    backgroundColor: Colors.darkScheme.lighter,
    borderColor: Colors.darkScheme.secondary,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  inputError: {
  
    backgroundColor: Colors.darkScheme.lighter,
    borderColor: Colors.darkScheme.red,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
   
  },
  inputLabel: {
    color: Colors.darkScheme.primary,
  },


  text: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'center',
    color: Colors.darkScheme.darkest,
  },
});

export default HomeScreen;
