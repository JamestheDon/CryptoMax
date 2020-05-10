import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Header2 = ({title, isHome, navigation}) => {
  return (
    <View style={styles.header}>
      {isHome ? (
        <ImageBackground
          accessibilityRole={'image'}
          source={require('./PrimoLogo2_500x500.png')}
          style={styles.background}
          imageStyle={styles.logo}>
          <Text style={styles.text}>This is not the home page!!</Text>
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
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <Text style={styles.text}> {title} </Text>
      </View>
    </View>
  );
};
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

export default Header2;
