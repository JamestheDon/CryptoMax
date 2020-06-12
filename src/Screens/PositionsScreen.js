import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Header, Colors, ListPosition, AddPosition} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import usePositions from '../hooks/usePositions';

// The important things in your life are what you do
// everyday... because you do them everyday. What can i do
// everyday thats easy enough to do withought thought everyday,
// and how can i build upon that in a sustainable way. Repeat, rest, repeat.
// Play with habitual routeins untill you reffine them into prestene shape.
//
// SOMEHITNG you did & SOMETHING you didnt do.

/**
 *
 *  @TODOs
 * - make simple color selector.
 * - delete async data function.
 * - get asynceStorage positions
 * - navigate to position details screen from List position
 * - clean basic component structure
 * - Add production api credentials
 *
 */

const PositionsScreen = ({navigation}) => {
  const [apiResults, errMsg] = usePositions([]);
  const [keys, setKeys] = useState();

  /**
   * @param string - account #'s for position types.
   * @description differnt accouts for different position types
   *
   *
   */
  // which account ?
  const [accounts, setAccounts] = useState(['001', '002', '003']);

  const [positions, setPositions] = useState([
    // {
    //   name: 'BTC',
    //   price: 8649.76,
    //   cost: 99.91,
    //   qty: '0.01155011',
    //   currDate: Date.now(),
    //   buyDate: 'May 10, 2020 at 11:49 AM ET',
    //   key: '1',
    // },
    // {
    //   name: 'BTC',
    //   price: 8696.93,
    //   cost: 99.83,
    //   qty: '0.0114779',
    //   currDate: Date.now(),
    //   buyDate: 'May 10, 2020 at 12:08',
    //   key: '2',
    // },
  ]);

  const getAllPositions = async () => {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            console.log({[store[i][0]]: store[i][1]});
            let parsedData = JSON.parse(store[i][1]);
            // console.log(parsedData);
            setPositions(prevState => {
              return [parsedData, ...prevState];
            });
            return true;
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const getPositions = async () => {
  //   try {
  //     // ERROR --> 1:AsynceStorage was returning null becuase theres nothing in storage.
  //     // ERROR --> 2: parsing pos was returning null.
  //     let pos = await AsyncStorage.getItem(accounts[0]);
  //     let parsedData = JSON.parse(pos);

  //     setPositions(prevState => {
  //       return [parsedData, ...prevState];
  //     });

  //     console.log(parsedData);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  useEffect(() => {
    getAllPositions();
  }, []);

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

  // getMultiple = async () => {

  //   let values;
  //   try {
  //     values = await AsyncStorage.multiGet('key');
  //   } catch (e) {
  //     // read error
  //   }
  //   console.log(values);

  //   // example console.log output:
  //   // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  // };

  // AsyncStorage.clear();
  return (
    <SafeAreaView>
      <Header title="Positions Screen" isHome={false} navigation={navigation} />

      <AddPosition
        accounts={accounts}
        positions={positions}
        setPositions={setPositions}
      />
      <ListPosition positions={positions} accounts={accounts} />

      {/* <View>
        <FlatList
          data={positions}
          keyExtractor={position => position.qty.toString()}
          renderItem={({item}) => {
            return <ListPosition position={item} />;
          }}
        />
      </View> */}
      <FlatList
        data={apiResults}
        keyExtractor={apiResults => apiResults.id}
        renderItem={({item}) => {
          return (
            <Text>
              {item.name} - {item.price}
            </Text>
          );
        }}
      />
      {/* <View>
        <FlatList
          data={positions}
          keyExtractor={position => position.key}
          renderItem={({item}) => {
            return <ListPosition position={item} />;
          }}
        />
      </View> */}
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

export default PositionsScreen;
