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
  return (
    <View>
      {isHome ? (
        <View>
          <ImageBackground
            accessibilityRole={'image'}
            source={require('./ti-logo-2-120x120.png')}
            style={styles.background}
            imageStyle={styles.logo}>
            <Text style={styles.text}>Welcome to Titan</Text>
          </ImageBackground>
          <Text>{title}</Text>
        </View>
      ) : (
        <ImageBackground
          accessibilityRole={'image'}
          source={require('./ti-logo-2-120x120.png')}
          style={styles.background}
          imageStyle={styles.logo}>
          <Text style={styles.text}>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              style={{marginLeft: 5}}
              onPress={() => navigation.goBack()}>
              <Text>back</Text>
            </TouchableOpacity>
            <Text>{title} WHere is here?</Text>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 100,
    paddingTop: 100,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: 0,
    marginBottom: -150,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
});

export default Header;
