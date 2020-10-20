import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Header, Colors} from '../Components/';
import ListPosition from '../Components/ListPosition';
import AsyncStorage from '@react-native-community/async-storage';
import usePositions from '../hooks/usePositions';
// import {addPositions} from '../../hooks/positions';

/**
 *
 *  @TODOs
 *  VirtualizedList: You have a large list that is slow to update -
 *  make sure your renderItem function renders components that follow
 *  React performance best practices like PureComponent, shouldComponentUpdate, etc.
 *  {"contentLength": 2175, "dt": 1917, "prevDt": 935} >>>>>>useMemo()
 *
 * - add whole number fractional representation of btc owned i.e. 1/3
 * - Add production api credentials
 *
 */

/**
 * @param string - account #'s for position types.
 * @description differnt accouts for different position types
 *
 * @TODO v2 add multi accout numbers.
 *
 *
 */

const PositionsScreen = ({navigation}) => {
  // const [accounts, setAccounts] = useState(['001', '002', '003']);

  // const [positions, setPosition] = useState([]);
  const [apiResults, positions, setPosition] = usePositions();

  /**
   *
   * Sum money invested
   *
   */

  // getAllKeys = async () => {
  //   let keys = [];
  //   try {
  //     keys = await AsyncStorage.getAllKeys();
  //   } catch (e) {
  //     // read key error
  //   }

  //   console.log(keys);
  //   // example console.log result:
  //   // ['@MyApp_user', '@MyApp_key']
  // };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Positions Screen" isHome={false} navigation={navigation} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '10%',
        }}>
        <Text>All current positions</Text>
      </View>

      {/* <FlatList
        data={apiResults}
        keyExtractor={apiResults => apiResults.id}
        renderItem={({item}) => {
          return (
            <Text>
              {item.name} - {item.price}
            </Text>
          );
        }}
      /> */}
      {/* <AddPosition
        // accounts={accounts}
        // positions={positions}

        addPosition={addPosition}
      /> */}

      <ListPosition
        positions={positions}
        navigation={navigation}
        setPosition={setPosition}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.darkScheme.dark,
  },
  screen: {
    flex: 1,
    padding: 20,

    backgroundColor: Colors.darkScheme.dark,
  },

  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
});

export default PositionsScreen;
