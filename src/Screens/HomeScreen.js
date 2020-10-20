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
import axios from 'axios';
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
  const [apiResults, positions] = usePositions([]);
  // const [positions] = usePositions();
  const [view, setView] = useState(false);
  const [btc$, setBtcPrice] = useState();

  //const btcPrice = apiResults.map(i => parseFloat(i.price).toFixed(2));

  useEffect(() => {
    console.log('START#', testNums());
    //  AsyncStorage.clear();
  });

  const testNums = () => {
    const nums = btc$;
    const regex = /^[1-9]\d*(((,\d{3}){1})?((\.\d{0,2})?(\.\d{8})?))$/;

    return regex.test(nums);
  };

  switchView = () => {
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
  //     await AsyncStorage.removeItem('17056520');
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
      <Header isHome={true} navigation={navigation} />
      <View style={styles.introBody}>
        <Text style={styles.introDescription}>
          Welcome to Ledger Max, a Bitcoin portfolio analyzer.
        </Text>
        <Text style={styles.text}>Bare bones crypto ledger.</Text>
        <Text style={styles.introDescription}>
          The FIRST thing to do is set the current Bitcoin price.
        </Text>
        <View style={styles.introButton}>
          <Input
            placeholder="10,000.00"
            label="Bitcoin price?"
            labelStyle={
              testNums() === true
                ? styles.inputLabelSuccess
                : styles.inputLabelError
            }
            containerStyle={styles.inputContainerStyle}
            style={styles.input}
            value={btc$}
            onChangeText={data => setBtcPrice(data)}
          />
        </View>
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
          <WelcomeMsg
            view={view}
            switchView={switchView}
            navigation={navigation}
            btc$={btc$}
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
    flex: 2,
    marginTop: '10%',
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.light,
  },
  introBody: {
    flex: 1,
    marginTop: 30,
    // height: '20%',
  },
  introDescription: {
    margin: 10,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.darkScheme.primary,
  },
  introButton: {
    marginBottom: 10,
  },
  inputLabelError: {
    color: Colors.darkScheme.red,
  },
  inputLabelSuccess: {
    color: Colors.darkScheme.secondary,
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
