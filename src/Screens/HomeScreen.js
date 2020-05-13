import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  CalendarHeatmap,
  DebugInstructions,
  ReloadInstructions,
} from '../Components/';
import {staticData2} from './staticData';

// import CalendarHeatmap from '@freakycoder/react-native-calendar-heatmap/lib/src/CalendarHeatmap'
// import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import Heatmap from '../Heatmap';

// The important things in your life are what you do
// everyday... because you do them everyday. What can i do
// everyday thats easy enough to do withought thought everyday,
// and how can i build upon that in a sustainable way. Repeat, rest, repeat.
// Play with habitual routeins untill you reffine them into presene shape.
//
// SOMEHITNG you did & SOMETHING you didnt do.

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header title="Home Screen" isHome={true} navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Text style={styles.sectionDescription}>
              Choose small things to do.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step Two</Text>
            <Text style={styles.sectionDescription}>
              Check youself once a day.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step Three</Text>
            <Text style={styles.sectionDescription}>Repeat.</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Whats next?</Text>
            <Text style={styles.sectionDescription}>
              Monitor, review and analyze.
            </Text>
          </View>
        </View>
        <View>
          <Text>121 Days in quarter.</Text>
          <CalendarHeatmap
            endDate={new Date('2020-04-30')}
            numDays={121} // 121 days for quater
            colorArray={['#eee', '#bcd6f7', '#656ac6', '#393b99', '#191c5c']}
            values={staticData2}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('HomeScreenDetails')}>
        <Text>Goto Home details</Text>
      </TouchableOpacity>
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

export default HomeScreen;
