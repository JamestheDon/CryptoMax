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
          <Text>{title}</Text>
        </View>
      )}
    </View>
  );
};

const homeHeader = StyleSheet.create({
  background: {
    paddingBottom: 100,
    paddingTop: 40,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
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
    marginBottom: -100,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
});
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,

    backgroundColor: 'grey',
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Header;
