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
import {Header, Colors, ListPosition} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import usePositions from '../hooks/usePositions';
// import {addPositions} from '../../hooks/positions';

/**
 *
 *  @TODOs
 * - make simple color selector.
 * -
 * - Add production api credentials
 *
 */

/**
 * @param string - account #'s for position types.
 * @description differnt accouts for different position types
 *
 * @TODO v2 add multi accout numbers.
 * @TODO get all keys, push qty into new array, convert to number, sum totals.
 *
 */

const PositionsScreen = ({navigation}) => {
  // const [accounts, setAccounts] = useState(['001', '002', '003']);

  // const [positions, setPosition] = useState([]);
  const [apiResults, positions, setPosition] = usePositions();
  const [totalQty, setTotalQty] = useState([]);

  const getTotalQty = async () => {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            // console.log({[store[i][0]]: store[i][1]});
            let parsedData = JSON.parse(store[i][1]);

            let storeData = parseFloat(parsedData.qty);
            // console.log(parsedData.qty);
            setTotalQty(prevState => {
              return [storeData, ...prevState];
            });

            return true;
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

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

      <TouchableOpacity style={styles.btn}>
        <Button
          title="Account Details"
          icon={<Icon name="bitcoin" size={20} color="purple" />}
          type="outline"
          onPress={() =>
            navigation.navigate('HomeScreenDetails', {data: positions})
          }
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  screen: {
    padding: 20,
    marginBottom: 100,
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
});

export default React.memo(PositionsScreen);
