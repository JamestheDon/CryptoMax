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
import {Alert} from 'react-native';
import {Header, Colors, AddPosition, WelcomeMsg} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';
import {useAddPosition} from '../hooks/positions';

// The important things in your life are what you do
// everyday... because you do them everyday. What can i do
// everyday thats easy enough to do withought thought everyday,
// and how can i build upon that in a sustainable way. Repeat, rest, repeat.
// Play with habitual routeins untill you reffine them into prestene shape.
//
// SOMEHITNG you did & SOMETHING you didnt do.

const HomeScreen = ({navigation}) => {
  // const [apiResults, positions, addPosition] = usePositions();
  const [addPosition] = useAddPosition();
  const [positions] = usePositions();
  const [view, setView] = useState(false);
  // useEffect(() => {
  //   //  console.log(positions);
  //   //  AsyncStorage.clear();
  // }, []);
  console.log('over herererererer', view);
  return (
    <SafeAreaView style={styles.component}>
      <Header title="Crypto Max" isHome={true} navigation={navigation} />

      {view === true ? (
        <View>
          <AddPosition
            // accounts={accounts}
            // positions={positions}

            addPosition={addPosition}
          />
        </View>
      ) : (
        <View style={{marginBottom: 10}}>
          <WelcomeMsg view={view} />
          <Button
            title="Add new entry"
            buttonStyle={{
              borderColor: Colors.dark,
              borderRadius: 25,
              borderWidth: 1,
            }}
            type="outline"
            icon={<Icon name="plus" size={20} color="green" />}
            // onPress={() => getPosition(item.key)}
            onPress={() => setView(true)}
          />
        </View>
      )}

      {/* <ListPosition positions={positions} navigation={navigation} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '50%',
    // alignItems: 'center',
    backgroundColor: Colors.dark,
    padding: 10,
  },
  body: {
    marginTop: 1,
    alignItems: 'center',
    backgroundColor: Colors.light,
  },
  component: {
    backgroundColor: Colors.light,
    height: 250,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.black,
  },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default HomeScreen;
