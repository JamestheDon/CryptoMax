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
import {Header, Colors, AddPosition} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';
import {useAddPosition} from '../hooks/positions';

// The important things in your life are what you do
// everyday... because you do them everyday. What can i do
// everyday thats easy enough to do withought thought everyday,
// and how can i build upon that in a sustainable way. Repeat, rest, repeat.
// Play with habitual routeins untill you reffine them into prestene shape.
//
// SOMEHITNG you did & SOMETHING you didnt do.

const HomeScreen = ({navigation}) => {
  // const [apiResults, positions, addPosition] = usePositions();
  const [positions, addPosition] = useAddPosition();

  // useEffect(() => {
  //   //  console.log(positions);
  //   //  AsyncStorage.clear();
  // }, []);

  return (
    <SafeAreaView>
      <Header title="Home Screen" isHome={true} navigation={navigation} />

      {/* {!positions ? <Text>this</Text> : <Text>that</Text>} */}

      <View style={{marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.btn}>
            <Button
              title="Position Details"
              type="outline"
              icon={<Icon name="bitcoin" size={20} color="green" />}
              // onPress={() => getPosition(item.key)}
              onPress={() => navigation.navigate('PositionsScreen')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Button
              title="Account Details"
              icon={<Icon name="bitcoin" size={20} color="purple" />}
              type="outline"
              onPress={() => navigation.navigate('HomeScreenDetails')}
            />
          </TouchableOpacity>
        </View>
        <AddPosition
          // accounts={accounts}
          // positions={positions}

          addPosition={addPosition}
        />
      </View>

      {/* <ListPosition positions={positions} navigation={navigation} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  btn: {
    width: '50%',
    // alignItems: 'center',

    padding: 10,
  },
  body: {
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
