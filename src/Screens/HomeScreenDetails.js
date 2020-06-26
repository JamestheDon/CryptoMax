import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Header, Colors} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const HomeScreenDetails = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Home Screen Detail"
        isHome={false}
        navigation={navigation}
      />

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen Details</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Purchased Price BTC</Text>
          <Text style={styles.sectionDescription}>
            Add a 'New Position' to you accout.
          </Text>
          <TouchableOpacity onPress={() => alert('Heating up habbit!!!')}>
            <View style={styles.heatButton}>
              <Icon name="shuffle" color="firebrick" size={50} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amount</Text>
          <Text style={styles.sectionDescription}>
            How much Bitcoin did you buy
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

export default HomeScreenDetails;
