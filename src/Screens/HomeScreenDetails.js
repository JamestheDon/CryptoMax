'use strict';

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

  const [apiResults, positions, setPosition, setRequestData, requestData] = usePositions();
  const {cost, price, qty, buyDate} = positions
  // const {price, cost, qty, key, currDate } = positions

  // const currPrice = apiResults.map(i => parseFloat(i.price).toFixed(2));
  const currPrice = btc$;

  // const [calculations, setCalculations] = useState({
  //   sumInvest: null,
  //   sumSats: null,
  // });

  
 // const {sumInvest, sumSats} = calculations;

  const [sumInvest, setSumInvest] = useState(0);

  const [sumSats, setSumSats] = useState(0)

  const [gains, setGains] = useState(0);

  const [equity, setEquity] = useState(0);

  const [avgRor, setAvgRor] = useState(0)

  useEffect(() => {
     getAvgRor();
     return () => {
       console.log('cleaning up rate of return')
     }
  });

  useEffect(() => {
    getPerformance();
    return () => {
      console.log('Cleaning up performance');
    };
  });
  useEffect(() => {
   // console.log('getCostSum() function results:', getCostSum())
    getCostSum();

    return () => {
      console.log('Cleaning up Cost Sum');
    };
  });
  useEffect(() => {
   // console.log('getQtySum() function results:', getQtySum())
    getQtySum();

    return () => {
      console.log('Cleaning up QTY SUm');
    };
  });
  useEffect(() => {
   
    getEquity();
    return () => {
      console.log('cleaning up equity');
    };
  });

  

   /**
   *
   * Sum gains
   *
   */
 const  getPerformance = () => {

    const $perf = positions.map((i, index) => {
      const $gain = parseFloat(
        ((currPrice - i.price) / i.price) * i.cost,
      ).toFixed(2);

      return {$gain};
    });

    const values = $perf.map(el => parseFloat(el.$gain));

    const result = values.reduce((acc, item) => (acc += item), 0).toFixed(2);

    setGains(result);

    console.log('getPerfomance() ', result);
    //  const rOr = parseFloat(((currPrice - pos.price) / pos.price) * 100);
    // const singleGain = (rOr / 100) * pos.cost;
  };

  /**
   * Rate of Return
   * currP - purP / purP * 100 = ror%
   * ECMAscript 5
   *
   */

  const getAvgRor = () => {
    const $ror = positions.map((p) => parseFloat((currPrice - p.price) / p.price * 100 ))
   const $avgRor = $ror.reduce((acc, item) => (acc += item), 0) / positions.length
  // return $avgRor.toFixed(2)
   setAvgRor($avgRor.toFixed(2))
  }
 

  /**
   *
   * Sum Satoshies held
   *
   */
 const getQtySum = () => {

    const qtyVals = positions.map(pos => parseFloat(pos.qty));
    const qtySum = qtyVals.reduce((acc, item) => (acc += item), 0).toFixed(8);

    setSumSats(qtySum)

    // setCalculations(prevState => {
    //   console.log('qtyVals TEST:', qtyVals)
    //   return {...prevState, sumSats: qtySum};
    // });
  };

  /**
   *
   * Sum money invested
   * 
   */
 const getCostSum = () => {
   
      const costVals = positions.map(pos => parseFloat(pos.cost));
      const costSum = costVals
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

      // setCalculations(prevState => {
      //   return {...prevState, sumInvest: costSum};
      // });
      setSumInvest(costSum)
 
  };

  // useEffect(() => {
  //   // AsyncStorage.clear();
  // }, []);
 const getEquity = () => {
    setEquity(() => {
      return (parseFloat(gains) + parseFloat(sumInvest)).toFixed(2);
    });

    //  console.log('EQUITY HRERE', typeof gains, typeof sumInvest);
  };

  return (
    <View style={styles.screen}>
      <Header title="Portfolio Details" isHome={false} navigation={navigation} />
      <ImageBackground
        accessibilityRole={'image'}
        source={require('../images/Icon-trans.png')}
        style={styles.background}
        imageStyle={styles.logo}>
        {/**
         *
         *
         */}
        { positions.length === 0 ? (
          <View style={{flexDirection: 'row'}}>
            <ActivityIndicator size="large" color={Colors.darkScheme.primary} />
            {/* <Text>Loading...</Text> */}
          </View>
        ) : (
          <View style={styles.detailsStyle}>
                 <View style={styles.sectionContainer}>
              <Icon
              style={styles.icon}
                name="scale-balance"
                color={Colors.darkScheme.gold}
                size={40}
              />

            
            </View>
            {/* <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}> Open Positions</Text>

           
            </View> */}
       

            <View style={styles.headlineContainer}>
              <Text style={styles.headline}>BTC Price: </Text>
              <Text style={styles.headline}>${currPrice}</Text>
            
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
              <Text style={styles.text}>Equity:</Text>
              <Text> ${equity}</Text>
            </View>
            <View style={styles.detailLines}>
              <Text style={styles.text}>Rate of Return:</Text>
              <Text> {avgRor}%</Text>
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
            
            Tap Position to edit
          </Text>
        </View>

        {positions.length === 0 ? (
          <View>
            <ActivityIndicator size="large" color={Colors.darkScheme.primary} />
          </View>
        ) : (
          <ListPosition
          
            navigation={navigation}
            setPosition={setPosition}
            requestData={requestData}
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
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 300,

    backgroundColor: Colors.darkScheme.ligher,
  },
  icon: {
    marginTop: 30,
    marginLeft: 4
  },
  logo: {
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
    marginLeft: 6,
    marginTop: 20,
    //  marginBottom: -75,
  },
  body: {
    flex: 3.5,
    backgroundColor: Colors.darkScheme.lighter,
    //  height: 450,
  },
  headlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    
  },
  headline: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.darkScheme.primary,
  },

  detailsStyle: {
    paddingTop: 10,
    width: '65%',
    // backgroundColor: Colors.darkScheme.light,
    // opacity: 0.5,
  },
  detailHighlight: {
    flexDirection: 'row', 
    justifyContent: 'center'
  },
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
    marginTop: 10,
      marginBottom: 7,
    padding: 1,
    // paddingHorizontal: 24,
    //backgroundColor: Colors.darkScheme.lighter,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
   
    marginTop: 5,
    fontSize: 20,
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
