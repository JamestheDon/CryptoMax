import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Header, Colors} from '../Components/';
import ListPosition from '../Components/ListPosition';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';

import {Alert} from 'react-native';

const HomeScreenDetails = ({route, navigation}) => {
  const {data} = route.params;
  const [apiResults, positions, setPosition] = usePositions();

  const currPrice = apiResults.map(i => parseFloat(i.price));
  const [performance, setPerformance] = useState([]);
  const [calculations, setCalculations] = useState({
    sumInvest: null,
    sumSats: null,
  });
  const [gains, setGains] = useState();
  const {sumInvest, sumSats} = calculations;
  // const {$gain} = gains;
  // const {rateOfReturn, singleGain} = performance;
  useEffect(() => {
    console.log(' OVER HERE', typeof gains);
  });

  useEffect(() => {
    getPerformance();
    //  getCostSum();
    //  getQtySum();
    //  getSumGains();
    return () => {
      console.log('Cleaning up performance');
    };
  });
  useEffect(() => {
    getCostSum();

    return () => {
      console.log('Cleaning up Cost SUm');
    };
  }, []);
  useEffect(() => {
    getQtySum();

    return () => {
      console.log('Cleaning up QTY SUm');
    };
  }, []);

  // console.log(calculations);

  getPerformance = () => {
    // const price = data.map(i => i.price);

    // const cost = data.map(i => i.cost);

    // const rateOfReturn = parseFloat(
    //   ((currPrice - price) / price) * 100,
    // ).toFixed(2);

    const $perf = positions.map((i, index) => {
      const $gain = parseFloat(
        ((currPrice - i.price) / i.price) * i.cost,
      ).toFixed(2);

      return {$gain};
    });

    const values = $perf.map(el => parseFloat(el.$gain));

    const result = values.reduce((acc, item) => (acc += item), 0).toFixed(2);

    setGains(result);

    // results = calculations;
    // setPerformance({$perf: $perf});

    console.log('OVErherer#####: ', result);

    // setPerformance(prevState => {
    //   return {calculations};
    // });
    // setPerformance(prevState => {
    //   return {...prevState, rateOfReturn: rateOfReturn, singleGain: singleGain};
    // });

    //  const rOr = parseFloat(((currPrice - pos.price) / pos.price) * 100);
    // const singleGain = (rOr / 100) * pos.cost;
  };

  /**
   * Rate of Return
   * currP - purP / purP * 100 = ror%
   * ECMAscript 5
   *
   */

  // console.log('THis is what i want', performance);
  // if (ror > 0 ) {
  //   return (
  //     <Text key={index}>
  //        + % {((`${currPrice}` - `${item.price}`) / `${item.price}`) * 100}
  //     </Text>)
  // } else {}
  /**
   *
   * Sum gains
   *
   */

  getSumGains = () => {
    // const gainVals = performance.map(val => parseFloat(val.$gain));
    // const sumGain = gainVals.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // values = [];
    Object.keys(performance).forEach(i => {
      console.log('testing ===>>', i, performance[i]);
      const {$gain, rateOfReturn} = performance[i];
      // const gain = performance[key];
      // values.push($gain);
      console.log('testing =++====>>', $gain);
    });

    console.log('testing ===###++##==>>', performance);

    //  const sumGain = gainVals.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // setCalculations(prevState => {
    //   return {...prevState, totalGains: sumGain};
    // });
  };

  /**
   *
   * Sum Satoshies held
   *
   */
  getQtySum = () => {
    const qtyVals = data.map(pos => parseFloat(pos.qty));
    const qtySum = qtyVals.reduce((acc, item) => (acc += item), 0).toFixed(8);

    setCalculations(prevState => {
      // Object.assign would also work
      return {...prevState, sumSats: qtySum};
    });
  };

  /**
   *
   * Sum money invested
   *
   */
  getCostSum = () => {
    try {
      const costVals = data.map(pos => parseFloat(pos.cost));
      const costSum = costVals
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

      setCalculations(prevState => {
        return {...prevState, sumInvest: costSum};
      });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log('OVERHERE', calculations);

  // const rateOfReturn = positions.map((item, index) => {

  //   return (
  //     <Text key={index}>
  //       + % {((`${currPrice}` - `${item.price}`) / `${item.price}`) * 100}
  //     </Text>
  //   );
  // });

  // const [calculations, setCalculations] = useState({
  //   ror: x,
  //   sumInvest: x,
  //   sumSats: x,
  // });

  // const calculations = () => {
  //   const newCalcs = {};
  //   try {
  //     positions.map((i, index) => {});
  //     const returnRate = sumInvest.filter(item => item > 0);
  //     const rOr = ((currPrice[i] - sumInvest[i]) / sumInvest[i]) * 100;

  //     setCalculations(prevState => {
  //       return [...prevState, newCalculations];
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   // AsyncStorage.clear();
  // }, []);

  return (
    <View
      style={{
        paddingTop: 10,
        backgroundColor: Colors.darkScheme.lighter,
      }}>
      <Header
        title="Home Screen Detail"
        isHome={false}
        navigation={navigation}
      />
      <ImageBackground
        accessibilityRole={'image'}
        source={require('../Components/components/Icon-trans.png')}
        style={styles.background}
        imageStyle={styles.logo}>
        {/* <View>
            <Text style={text}>{title}</Text>
            <Text style={{fontSize: 20, color: Colors.darkScheme.light}}>
              ${btcPrice}
            </Text>
          </View> */}
        <View
          style={{
            alignItems: 'center',
            // justifyContent: 'center',
            height: '30%',
          }}>
          <Text style={styles.highlight}>Details</Text>
        </View>

        {gains == 0 || gains === null ? (
          <View>
            <ActivityIndicator size="large" color={Colors.darkScheme.primary} />
          </View>
        ) : (
          <View style={{padding: 10}}>
            <Text style={styles.text}>Sum Gains:{gains} </Text>
            <Text style={styles.text}>
              Sum Invested:
              {sumInvest}
            </Text>
            <Text style={styles.text}>
              Sum Satoshies:
              {sumSats}
            </Text>
          </View>
        )}
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Icon
            name="scale-balance"
            color={Colors.darkScheme.light}
            size={30}
          />
          <Text style={styles.sectionTitle}>All Positions</Text>

          {/* <Text style={styles.sectionDescription}>More info</Text> */}

          {/* <Text>{rOr[0]}</Text> */}
        </View>

        {gains == 0 || gains === null ? (
          <View>
            <ActivityIndicator size="large" color={Colors.darkScheme.primary} />
          </View>
        ) : (
          <ListPosition
            positions={positions}
            navigation={navigation}
            setPosition={setPosition}
            currPrice={currPrice}
          />
        )}
      </View>
    </View>
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
  logo: {
    // opacity: 0.4,
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

    marginTop: 40,
    marginBottom: -75,
  },
  body: {
    backgroundColor: Colors.darkScheme.darker,
    height: 450,
  },
  highlight: {
    fontWeight: '700',
    fontSize: 30,
    color: Colors.darkScheme.primary,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.darkScheme.primary,
  },
  background: {
    height: 300,
    width: '100%',
    // paddingBottom: 100,
    paddingTop: 25,
    // paddingHorizontal: 32,
    backgroundColor: Colors.darkScheme.lighter,
  },
  sectionContainer: {
    //  marginTop: 32,
    padding: 10,
    // paddingHorizontal: 24,
    backgroundColor: Colors.darkScheme.darker,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkScheme.light,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.darkScheme.primary,
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
