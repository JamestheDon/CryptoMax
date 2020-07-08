import {useEffect, useState} from 'react';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
  const [positions, setPosition] = useState([]);

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
        buyDate: buyDate,
        currDate: Date.now(),
      };
      await AsyncStorage.setItem(pos.key, JSON.stringify(pos));
      setPosition(prevState => {
        return [pos, ...prevState];
      });
      Alert.alert(`Position created: ${pos.currDate}`);
    } catch (err) {
      console.log('OVWER HERE!!', err);
    }
  };
  return [positions, addPosition];
};
