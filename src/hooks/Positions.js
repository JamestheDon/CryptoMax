'use strict';
import {useEffect, useState} from 'react';

import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import usePositions from './usePositions';

// export const useNomicsApi = () => {
//   const [errMsg, setErrMsg] = useState('');
//   const [apiResults, setApiResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   // @TODO add real api key
//   // Get current Bitcoin data.
//   useEffect(() => {
//     getBitconPrice();
//   }, []);

//   const getBitconPrice = async () => {
//     try {
//       setIsLoading(true);
//       const resData = await axios.get(
//         'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC&convert=USD',
//       );
//       console.log(resData.data);
//       setApiResults(resData.data);
//     } catch (err) {
//       setIsLoading(false);
//       console.log(err);
//       setErrMsg('Something went wrong');
//     }
//   };

//   return [isLoading, apiResults];
// };

export const useAddPosition = () => {
  //
  const [state, setState] = useState([]);
  const [apiResults, positions, setPosition] = usePositions([]);

  const addPosition = async (price, cost, qty, buyDate) => {
   const generateID = () => {
      return Math.floor(Math.random() * 100000000).toString();
    };

    try {
      const pos = {
        key: generateID(),
        price: parseFloat(price).toFixed(2),
        cost: parseFloat(cost).toFixed(2),
        qty: parseFloat(qty).toFixed(8),
        buyDate: new Date(buyDate),
        currDate: new Date(),
      };
      await AsyncStorage.setItem(pos.key, JSON.stringify(pos));
      setPosition(prevState => {
        return [pos, ...prevState]
      })
      Alert.alert(
        `Position created at: ${pos.currDate.toGMTString()} The Ledger has now been activated.`,
      );
    } catch (err) {
      console.log('An ERROR has occured', err);
    }
  };
  return [positions, addPosition];
};

// export const useCalculations = () => {
//   const [calculations, setCalculations] = useState([]);
//   const [apiResults, positions] = usePositions();
//   const currPrice = apiResults.map(i => i.price);

//   // rateOfReturn = positions.map((val, i) => {
//   //   return ((currPrice - val[i].price) / val[i].price * 100 )
//   // })

//   const calculate = () => {
//     const {cost, price, qty, key} = positions;
//     // Rate of return
//     // current price - purchase price / purchase price * 100 = ror%
//     rateOfReturn = () => {
//       return parseFloat(
//         ((currPrice - positions[key].price) / positions[key].price) * 100,
//       ).toFixed(2);
//     };
//   };

//   try {
//   } catch (error) {
//     console.log(error);
//   }

//   return [calculations];
// };
