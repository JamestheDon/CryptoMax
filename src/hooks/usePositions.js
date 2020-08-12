import {useEffect, useState} from 'react';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  const [errMsg, setErrMsg] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [positions, setPosition] = useState([]);

  // console.log(apiResults.map(i => i.price));

  /**
   *
   *  @param string Position values
   *
   *  [ ] @todo Robust key/account system solution
   */

  const getAllPositions = async () => {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            // console.log({[store[i][0]]: store[i][1]});
            let parsedData = JSON.parse(store[i][1]);
            // console.log(parsedData);
            setPosition(prevState => {
              return [parsedData, ...prevState];
            });
            return true;
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  // @TODO add real api key
  // Get current Bitcoin data.
  const getBitconPrice = async () => {
    // const currPrice = apiResults.map(i => i.price);
    try {
      const resData = await axios.get(
        'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC&convert=USD',
      );
      // console.log(resData.data);
      setApiResults(resData.data);
    } catch (err) {
      console.log(err);
      setErrMsg('Something went wrong');
    }
  };

  useEffect(() => {
    getBitconPrice();
    return () => {
      console.log('Cleaning up api call...');
    };
  }, []);

  useEffect(() => {
    getAllPositions();
    return () => {
      console.log('Cleaning up positions...');
    };
  }, []);

  return [apiResults, positions, setPosition, getAllPositions];
};
