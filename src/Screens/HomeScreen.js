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
import {Button} from 'react-native-elements';
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
  // useEffect(() => {
  //   //  console.log(positions);
  //   //  AsyncStorage.clear();
  // }, []);
  const btcPrice = apiResults.map(i => parseFloat(i.price).toFixed(2));

  switchView = () => {
    if (view === true) {
      setView(false);
    } else {
      setView(true);
    }
  };

  useEffect(() => {
    console.log(process.env.NODE_ENV);
  }, [positions]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Crypto Max"
        isHome={true}
        navigation={navigation}
        btcPrice={btcPrice}
      />

      {positions > 0 || view == true ? (
        <View style={styles.body}>
          <AddPosition
            // accounts={accounts}
            positions={positions}
            navigation={navigation}
            addPosition={addPosition}
            switchView={switchView}
          />
        </View>
      ) : (
        <View
          style={{
            // marginBottom: 10,
            height: 500,
            alignItems: 'center',
            // backgroundColor: Colors.darkScheme.darker,
          }}>
          <WelcomeMsg
            view={view}
            switchView={switchView}
            navigation={navigation}
          />
        </View>
      )}

      {/* <ListPosition positions={positions} navigation={navigation} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '50%',
    // alignItems: 'center',
    backgroundColor: Colors.dark,
    padding: 10,
  },
  body: {
    // marginTop: 1,
    alignItems: 'center',
    backgroundColor: Colors.darkScheme.lighter,
  },

  screen: {
    backgroundColor: Colors.darkScheme.lighter,
    height: '100%',
    paddingTop: 60,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default HomeScreen;
