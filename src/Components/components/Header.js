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
  const {background, logo, text, headline} = homeHeader;

  return (
    <SafeAreaView style={{flex: 0.5}}>
      {isHome ? (
        <View style={{flex: 0}}>
          <ImageBackground
            accessibilityRole={'image'}
            source={require('../../images/Icon-trans.png')}
            style={background}
            imageStyle={logo}>
            <View>
              <Text style={headline}>{title}</Text>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View style={styles.background}>
          <View
            style={{
              flexDirection: 'row',
              //   padding: 1,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-left-bold-circle-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>

            <Text style={styles.text}>{title}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const homeHeader = StyleSheet.create({
  background: {
    flex: 1,
    // height: '50%',
    // paddingBottom: 5,
    // paddingTop: 10,
    // paddingHorizontal: 32,
    backgroundColor: Colors.darkScheme.lighter,
  },
  logo: {
    //flex: 1,
    //opacity: 0.5,
    overflow: 'visible',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',

    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */

    // marginTop: 50,
    // marginBottom: -75,
  },
  headline: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.darkScheme.primary,
  },
  text: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'center',
    color: Colors.darkScheme.darkest,
  },
});

const styles = StyleSheet.create({
  background: {
    alignContent: 'space-between',
    padding: 10,
    height: '80%',
    // flex: 0.9,
    backgroundColor: Colors.darkScheme.dark,
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
