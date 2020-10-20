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

/**
 *
 *
 *
 *
 * @todo add Equity detail
 *       @todo editPosition hook
 *            @todo style component
 *                @todo if pos === 0 ? "open new positions" : ListPositions
 *            @todo sumPos currState === newState ? dont update : update state
 */

const HomeScreenDetails = ({route, navigation}) => {
  const {data, btc$} = route.params;

  const [apiResults, positions, setPosition] = usePositions();

  // const currPrice = apiResults.map(i => parseFloat(i.price).toFixed(2));
  const currPrice = btc$;

  const [calculations, setCalculations] = useState({
    sumInvest: null,
    sumSats: null,
  });
  const {sumInvest, sumSats} = calculations;

  const [gains, setGains] = useState();

  const [equity, setEquity] = useState();

  // useEffect(() => {
  //   console.log(' OVER HERE', btc);
  // });

  useEffect(() => {
    getPerformance();
    return () => {
      console.log('Cleaning up performance');
    };
  });
  useEffect(() => {
    getCostSum();

    return () => {
      console.log('Cleaning up Cost Sum');
    };
  }, []);
  useEffect(() => {
    getQtySum();

    return () => {
      console.log('Cleaning up QTY SUm');
    };
  }, []);
  useEffect(() => {
    // console.log('WEIRD', getEquity());
    getEquity();
    return () => {
      console.log('cleaning up equity');
    };
  });

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

  // getSumGains = () => {
  //   // const gainVals = performance.map(val => parseFloat(val.$gain));
  //   // const sumGain = gainVals.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //   // values = [];
  //   Object.keys(performance).forEach(i => {
  //     console.log('testing ===>>', i, performance[i]);
  //     const {$gain, rateOfReturn} = performance[i];
  //     // const gain = performance[key];
  //     // values.push($gain);
  //     console.log('testing =++====>>', $gain);
  //   });

  //   console.log('testing ===###++##==>>', performance);

  //   //  const sumGain = gainVals.reduce((acc, item) => (acc += item), 0).toFixed(2);

  //   // setCalculations(prevState => {
  //   //   return {...prevState, totalGains: sumGain};
  //   // });
  // };

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

  // useEffect(() => {
  //   // AsyncStorage.clear();
  // }, []);
  getEquity = () => {
    setEquity(() => {
      return (parseFloat(gains) + parseFloat(sumInvest)).toFixed(2);
    });

    //  console.log('EQUITY HRERE', typeof gains, typeof sumInvest);
  };

  return (
    <View style={styles.screen}>
      <Header title="Details" isHome={false} navigation={navigation} />
      <ImageBackground
        accessibilityRole={'image'}
        source={require('../images/Icon-trans.png')}
        style={styles.background}
        imageStyle={styles.logo}>
        {/**
         *
         *
         */}
        {gains == 0 || gains === null ? (
          <View style={{flexDirection: 'row'}}>
            <ActivityIndicator size="large" color={Colors.darkScheme.primary} />
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={styles.detailsStyle}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}> Open positions</Text>

              {/* <Text>{rOr[0]}</Text> */}
            </View>
            <View style={styles.sectionContainer}>
              <Icon
                name="scale-balance"
                color={Colors.darkScheme.gold}
                size={40}
              />

              {/* <Text>{rOr[0]}</Text> */}
            </View>

            <View style={styles.detailLines}>
              <Text style={styles.text}>BTC Price:</Text>
              <Text>${currPrice}</Text>
            </View>
            <View style={styles.detailLines}>
              <Text style={styles.text}>Equity:</Text>
              <Text> ${equity}</Text>
            </View>
            <View style={styles.detailLines}>
              <Text style={styles.text}>Gains: </Text>
              <Text>${gains}</Text>
            </View>
            <View style={styles.detailLines}>
              <Text style={styles.text}>Invested:</Text>
              <Text> ${sumInvest}</Text>
            </View>
            <View style={styles.detailLines}>
              <Text style={styles.text}>Satoshies:</Text>
              <Text> {sumSats}</Text>
            </View>
          </View>
        )}
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>
            Click Position for full details
          </Text>
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
            btc$={btc$}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: 10,
    backgroundColor: Colors.darkScheme.lighter,
  },
  background: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 300,

    backgroundColor: Colors.darkScheme.ligher,
  },

  logo: {
    opacity: 0.5,
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

    marginTop: 20,
    //  marginBottom: -75,
  },
  body: {
    flex: 4,
    backgroundColor: Colors.darkScheme.lighter,
    //  height: 450,
  },
  highlight: {
    fontWeight: '700',
    fontSize: 40,
    color: Colors.darkScheme.primary,
  },

  detailsStyle: {
    width: '75%',
  },
  detailHighlight: {flexDirection: 'row', justifyContent: 'center'},
  detailLines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.darkScheme.primary,
  },

  sectionContainer: {
    //  marginTop: 32,
    padding: 1,
    // paddingHorizontal: 24,
    backgroundColor: Colors.darkScheme.lighter,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkScheme.primary,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '500',
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
