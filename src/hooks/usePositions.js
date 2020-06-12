import {useEffect, useState} from 'react';
import axios from 'axios';
import {Alert} from 'react-native';

// @TODO build a data stream. MongoDB?

export default () => {
  const [errMsg, setErrMsg] = useState('');
  const [apiResults, setApiResults] = useState([]);
  // const [position, setPositon] = useState({
  //   name: 'BTC',
  //   price: null,
  //   cost: null,
  //   qty: null,
  //   currDate: Date.now(),
  //   buyDate: '',
  // });

  // @ Not sure how to use the SINGULAR position name.

  const [position, setPosition] = useState({
    name: 'BTC',
    price: null,
    cost: null,
    qty: null,
    currDate: Date.now(),
    buyDate: '',
  });

  // @TODO add real api key
  // Get current Bitcoin data.
  const getBitconPrice = async () => {
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
  }, []);

  // const getPositions = () => {
  // /**
  //  *  @todo
  //  *  getAllKeys all keys
  //  *  keys = []
  //  *  pass all keys to multiGet
  //  *
  //  */
  //     try {
  //       // ERROR --> 1:AsynceStorage was returning null becuase theres nothing in storage.
  //       // ERROR --> 2: parsing pos was returning null.
  //       let pos = await AsyncStorage.multiGet();
  //       let parsedData = JSON.parse(pos);

  //       // setPositions(prevState => {
  //       //   return [parsedData, ...prevState];
  //       // });
  //       alert('Take me to the details page!');
  //       console.log(pos);
  //     } catch (err) {
  //       alert(err);
  //     }

  // }

  const addPosition = (price, cost, qty) => {
    const newPos = [
      {
        name: 'BTC',
        price,
        cost,

        currDate: Date.now(),
        buyDate: '',
      },
    ];
    console.log(newPos);
    setPositions(newPos);
  };

  return [apiResults, errMsg, addPosition];
};
