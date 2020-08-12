import Colors from './Colors';
// import type {Node} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Header = ({title, isHome, navigation, btcPrice}) => {
  const {background, logo, text} = homeHeader;

  return (
    <View>
      {isHome ? (
        <ImageBackground
          accessibilityRole={'image'}
          source={require('./PrimoLogo2_500x500.png')}
          style={background}
          imageStyle={logo}>
          <View>
            <Text style={text}>{title}</Text>
            <Text style={{fontSize: 20, color: Colors.darkScheme.light}}>
              ${btcPrice}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.background}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.goBack()}>
            <Text style={{textAlign: 'left', color: 'white'}}>back</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const homeHeader = StyleSheet.create({
  background: {
    height: 275,
    // paddingBottom: 100,
    paddingTop: 25,
    paddingHorizontal: 32,
    backgroundColor: Colors.darkScheme.dark,
  },
  logo: {
    opacity: 0.1,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: 0,
    marginBottom: -75,
  },
  text: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.darkScheme.primary,
  },
});

const styles = StyleSheet.create({
  background: {
    alignContent: 'space-between',
    padding: 15,
    height: 60,
    backgroundColor: Colors.darkScheme.darker,
  },
  header: {
    backgroundColor: '#596469',
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Header;
