import {useEffect, useState} from 'react';
import axios from 'axios';
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
  const [state, setPosition] = useState([]);
  const [apiResults, positions] = usePositions();

  const addPosition = async (price, cost, qty, buyDate) => {
    generateID = () => {
      return Math.floor(Math.random() * 100000000).toString();
    };

    try {
      const pos = {
        key: generateID(),
        price: price,
        cost: cost,
        qty: qty,
        buyDate: new Date(buyDate),
        currDate: Date.now(),
      };
      await AsyncStorage.setItem(pos.key, JSON.stringify(pos));
      setPosition(prevState => {
        return [pos, ...prevState];
      });
      Alert.alert(
        `Position created at: ${
          pos.currDate
        }. Head over to Details page for a list of open positions.`,
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
