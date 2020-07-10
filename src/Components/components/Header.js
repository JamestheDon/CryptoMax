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

const Header = ({title, isHome, navigation}) => {
  const {background, logo, text} = homeHeader;

  return (
    <View>
      {isHome ? (
        <ImageBackground
          accessibilityRole={'image'}
          source={require('./PrimoLogo2_500x500.png')}
          style={background}
          imageStyle={logo}>
          <Text style={text}>{title}</Text>
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
    paddingBottom: 100,
    paddingTop: 25,
    paddingHorizontal: 32,
    backgroundColor: Colors.light,
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
    color: Colors.primary,
  },
});

const styles = StyleSheet.create({
  background: {
    alignContent: 'space-between',
    height: 50,
    backgroundColor: Colors.dark,
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
