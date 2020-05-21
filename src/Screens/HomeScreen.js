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
import {Header, Colors, ListPosition} from '../Components/';
import axios from 'axios';
import {TextInput} from 'react-native-gesture-handler';

// The important things in your life are what you do
// everyday... because you do them everyday. What can i do
// everyday thats easy enough to do withought thought everyday,
// and how can i build upon that in a sustainable way. Repeat, rest, repeat.
// Play with habitual routeins untill you reffine them into prestene shape.
//
// SOMEHITNG you did & SOMETHING you didnt do.

const HomeScreen = ({navigation}) => {
  const [apiResults, setApiResults] = useState([]);

  const [positions, setPosition] = useState([
    {
      name: 'BTC',
      price: 8649.76,
      cost: 99.91,
      qty: 0.01155011,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 11:49 AM ET',
    },
    {
      name: 'BTC',
      price: 8696.93,
      cost: 99.83,
      qty: 0.0114779,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 12:08',
    },
  ]);
  // const [account, setAccount] = useState([
  //   {
  //     id: Date.now(),
  //     price: '',
  //     cost: '',
  //     qty: '0.01155011',
  //     currDate: Date.now(),
  //   },
  // ]);

  // @TODO add real api key
  // @TODO create "hooks" dir and relocate hook
  // Get current Bitcoin data.
  const getBitconPrice = async () => {
    try {
      const resData = await axios.get(
        'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC&convert=USD',
      );
      console.log(resData.data);
      setApiResults(resData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBitconPrice();
  }, []);

  const onChange = inputValue => setPosition(inputValue);

  return (
    <SafeAreaView>
      <Header title="Home Screen" isHome={true} navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>

            <Text style={styles.sectionDescription}>
              Add a 'New Position' to you accouts.
            </Text>
            <TextInput placeholder="New Position" onChangeText={onChange} />
            <TouchableOpacity onPress={() => alert('Heating up habbit!!!')}>
              <View style={styles.heatButton}>
                <Text>button</Text>
                {/* <Icon name="bank" color="firebrick" size={50} /> */}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step Two</Text>
            <Text style={styles.sectionDescription}>
              Gain insights into your capital distributions for every buy,sell
              or hodl.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step Three</Text>
            <Text style={styles.sectionDescription}>Take action</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Finally</Text>
            <Text style={styles.sectionDescription}>
              Checkout details page to adjust settings.
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* @TODO add ListPosition Component to return View. */}
      <FlatList
        data={apiResults}
        keyExtractor={apiResults => apiResults.id}
        renderItem={({item}) => {
          return <Text>{item.price}</Text>;
        }}
      />

      <View>
        <FlatList
          data={positions}
          keyExtractor={position => position.qty.toString()}
          renderItem={({item}) => {
            return <ListPosition position={item} />;
          }}
        />
      </View>

      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('HomeScreenDetails')}>
        <Text>Account Details</Text>
      </TouchableOpacity>
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

export default HomeScreen;
