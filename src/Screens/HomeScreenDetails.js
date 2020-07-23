import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Header, Colors} from '../Components/';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import usePositions from '../hooks/usePositions';

import {Alert} from 'react-native';

const HomeScreenDetails = ({navigation}) => {
  const [apiResults, positions] = usePositions();
  const [returnRate, setReturnRate] = useState([]);
  const currPrice = apiResults.map(i => i.price);

  const [calculations, setCalculations] = useState({
    performance: [{key: null, rOr: null}], // array of return rate percentages.
    sumInvest: null,
    sumSats: null,
    //  singlePosGains: ror / 100 * cost,
    totalGains: null,
  });

  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    getRateOfReturn();
  }, []);
  const getRateOfReturn = () => {
    try {
      // let results = [];
      //  results = {};
      Object.keys(positions).forEach(key => {
        // let results = {};
        // console.log('@@@@@', key, positions[key]);

        // ror calc
        const rOr = parseFloat(
          ((currPrice - positions[key].price) / positions[key].price) * 100,
        ).toFixed(2);

        const gain = parseFloat((rOr / 100) * positions[key].cost).toFixed(2);

        const results = {
          posKey: positions[key].key,
          price: positions[key].price,
          cost: positions[key].cost,
          qty: positions[key].qty,
          rOr: rOr,
          gain: gain,
        };
        setPerformance(prevState => {
          return [results, ...prevState];
        });

        //  console.log('OVErherer: ', results);
      });

      // return results;
      // setPerformance(prevState => {

      // })
    } catch (error) {
      console.log(error);
    }

    //  const rOr = parseFloat(((currPrice - pos.price) / pos.price) * 100);
    // const singleGain = (rOr / 100) * pos.cost;

    // setCalculations(prevState => {
    //   // Object.assign would also work
    //   return {...prevState, performance: [{key: result[key].key, rOr: rOr}]};
    // });
  };

  /**
   * Rate of Return
   * currP - purP / purP * 100 = ror%
   * ECMAscript 5
   *
   */

  console.log('THis is what i want', performance);
  // if (ror > 0 ) {
  //   return (
  //     <Text key={index}>
  //        + % {((`${currPrice}` - `${item.price}`) / `${item.price}`) * 100}
  //     </Text>)
  // } else {}
  /**
   *
   * Sum Satoshies held
   *
   */
  getQtySum = () => {
    const qtyVals = positions.map(pos => parseFloat(pos.qty));
    const qtySum = qtyVals.reduce((acc, item) => (acc += item), 0);

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
    const costVals = positions.map(pos => parseFloat(pos.cost));
    const costSum = costVals.reduce((acc, item) => (acc += item), 0);

    setCalculations(prevState => {
      // Object.assign would also work
      return {...prevState, sumInvest: costSum};
    });
  };

  // console.log('OVERHERE', calculations);

  const calcSums = () => {
    const currPrice = apiResults.map(i => i.price);

    try {
      //  positions.reduce()

      // const newCalcs = {
      //  // ror: null,
      //   sumInvest: () => {i.cost},
      //   sumSats: null,
      //  // singlePosGains: null,
      //   totalGains: null
      // }
      const qtyVals = positions.map(pos => parseFloat(pos.qty));
      const qtySum = qtyVals.reduce(
        (acc, item) => (acc += item),
        'didnt re-render',
      );

      const costVals = positions.map(pos => parseFloat(pos.cost));
      const costSum = costVals.reduce((acc, item) => (acc += item), 0);
      // newVal = val.reduce((a, b) => a + b, 0);
      // const rOr = ((currPrice - i.price) / i.price) * 100;
      // const sign = ror.amount < 0 ? '-' : '+';
      // sumInvest = i.price.reduce()
      console.log(costSum, qtySum);
    } catch (err) {
      console.log(err);
      Alert.alert(`ERROR: ${err}`);
    }
  };

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

  //   <FlatList
  //   data={positions}
  //   keyExtractor={item => item.key}
  //   renderItem={({item}) => (
  //     <View>
  //       <Text key={item.key}>
  //         + %{/** Rate of Return formula */}
  //         {((`${currPrice}` - `${item.price}`) / `${item.price}`) * 100}
  //       </Text>
  //     </View>
  //   )}
  // />

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Home Screen Detail"
        isHome={false}
        navigation={navigation}
      />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '40%',
        }}>
        <Text>Home Screen Details</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={performance}
          keyExtractor={performance => performance.key}
          renderItem={({item}) => {
            return <Text>{item.gain}</Text>;
          }}
        />
        <View style={styles.sectionContainer}>
          <Icon name="scale-balance" color="black" size={20} />
          <Text style={styles.sectionTitle}>Totals</Text>
          {/* {ror > 0 ? (<Text>+ {ror}% green</Text>) : (<Text>{ror}% red</Text>)} */}

          {/* <Text>{rOr[0]}</Text> */}
          <Text>
            Sum Invested:
            {/* {costSum} */}
          </Text>
          <Text>
            Sum Satoshies:
            {/* {qtySum} */}
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Totals</Text>
          <Text style={styles.sectionDescription}>
            Bitcoin sats = initUSD = avgReturn =
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>How much USD$ cost?</Text>
          <Text style={styles.sectionDescription}>Take action</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>WHats the date stamp</Text>
          <Text style={styles.sectionDescription}>
            Checkout details page to adjust settings.
          </Text>
        </View>
      </View>
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
    fontSize: 15,
    fontWeight: '600',
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

export default HomeScreenDetails;
