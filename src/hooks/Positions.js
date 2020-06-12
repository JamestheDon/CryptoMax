import {useState, useEffect} from 'react';

export const usePositions = () => {
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [positions, setPositions] = useState([
    {
      name: 'BTC',
      price: 8649.76,
      cost: 99.91,
      qty: 0.01155011,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 11:49 AM ET',
    },
    {
      name: 'BTC',
      price: 8696.93,
      cost: 99.83,
      qty: 0.0114779,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 12:08',
    },
  ]);

  //   useEffect(() => {
  //     getPositions();
  //   }, []);

  //   const getPositions = async () => {
  //     // option: pass (params & moreParams)
  //     try {
  //       setIsLoading(true);

  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false);
  //     }
  //   };
  return [isLoading, positions];
};

export const useNomicsApi = () => {
  const [errMsg, setErrMsg] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // @TODO add real api key
  // Get current Bitcoin data.
  const getBitconPrice = async () => {
    try {
      setIsLoading(true);
      const resData = await axios.get(
        'https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC&convert=USD',
      );
      console.log(resData.data);
      setApiResults(resData.data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setErrMsg('Something went wrong');
    }
  };

  useEffect(() => {
    getBitconPrice();
  }, []);

  return [isLoading, apiResults];
};

export const useAddPosition = (price, cost, qty,) => {
  const [positions, setPositions] = useState([
    {
      name: 'BTC',
      price: 8649.76,
      cost: 99.91,
      qty: 0.01155011,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 11:49 AM ET',
    },
    {
      name: 'BTC',
      price: 8696.93,
      cost: 99.83,
      qty: 0.0114779,
      currDate: Date.now(),
      buyDate: 'May 10, 2020 at 12:08',
    },
  ]);

  const addPosition = (price, cost, qty) => {
    try {
      const pos = {
        key: qty,
        price: price,
        cost: cost,
        qty: qty,
        buyDate: buyDate,
      };
      await AsyncStorage.setItem(pos.key, JSON.stringify(pos));
      setPositions(prevState => {
        return [pos, ...prevState];
      });
    } catch (err) {
      console.log(err);
    }
  };
};
