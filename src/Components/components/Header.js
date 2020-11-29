'use strict';
import Colors from './Colors';
// import type {Node} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Header = ({title, isHome, navigation}) => {
  const {background, logo, text, headline, headlineView} = homeHeader;

  return (
    <>
      {isHome ? (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <ImageBackground
            accessibilityRole={'image'}
            source={require('../../images/Icon-trans.png')}
            style={background}
            imageStyle={logo}>
            <View style={headlineView}>
              <Text style={headline}>{title}</Text>
              <Text style={text}>Welcome to Ledger Max, a Bitcoin ledger.</Text>
            </View>
          </ImageBackground>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.background}>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: 30,
              // marginBottom: 10,
              //    paddingTop: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigation.goBack()}>
              <Icon
                style={styles.icon}
                name="arrow-left-bold-circle-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>

            <Text style={styles.text}>{title}</Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const homeHeader = StyleSheet.create({
  background: {
    flex: 1,

    backgroundColor: Colors.darkScheme.lighter,
  },
  logo: {
    //flex: 1,
    //opacity: 0.5,
    overflow: 'visible',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    marginLeft: 6,
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */

    marginTop: 100,
  },
  headlineView: {
    marginTop: 120,
  },
  headline: {
    height: 50,

    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.darkScheme.primary,
  },
  text: {
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.darkScheme.darkest,
  },
});

const styles = StyleSheet.create({
  background: {
    alignContent: 'space-between',
    // marginBottom: 50,
    // padding: 10,
    height: '11%',

    // flex: 0.4,
    backgroundColor: Colors.darkScheme.dark,
  },
  header: {
    backgroundColor: '#596469',
  },
  icon: {
    //  margin: 10,
    padding: 5,
  },
  text: {
    color: 'white',
    marginRight: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Header;
