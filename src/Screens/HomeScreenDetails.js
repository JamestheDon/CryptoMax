import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Header, Colors} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';

const HomeScreenDetails = ({navigation}) => {
  const [apiResults, positions] = usePositions();
  const [returnRate, setReturnRate] = useState([]);

  const currPrice = apiResults.map(i => i.price);

  const rateOfReturn = positions.map((item, index) => {
    const currPrice = apiResults.map(i => i.price);

    return (
      <Text key={index}>
        + % {((`${currPrice}` - `${item.price}`) / `${item.price}`) * 100}
      </Text>
    );
  });

  updateTotals = () => {
    const returnRate = sumInvest.filter(item => item > 0);
    const rOr = ((currPrice[0] - sumInvest[0]) / sumInvest[0]) * 100;
  };

  useEffect(() => {
    // AsyncStorage.clear();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Home Screen Detail"
        isHome={false}
        navigation={navigation}
      />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '40%',
        }}>
        <Text>Home Screen Details</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Icon name="scale-balance" color="black" size={20} />
          <Text style={styles.sectionTitle}>Rate of Return</Text>
        </View>
        <FlatList
          data={positions}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View>
              <Text key={item.key}>
                + %{/** Rate of Return formula */}
                {((`${currPrice}` - `${item.price}`) / `${item.price}`) * 100}
              </Text>
            </View>
          )}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Totals</Text>
          <Text style={styles.sectionDescription}>
            Bitcoin sats = initUSD = avgReturn =
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>How much USD$ cost?</Text>
          <Text style={styles.sectionDescription}>Take action</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>WHats the date stamp</Text>
          <Text style={styles.sectionDescription}>
            Checkout details page to adjust settings.
          </Text>
        </View>
      </View>
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
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
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

export default HomeScreenDetails;
