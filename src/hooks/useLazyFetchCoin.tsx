import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ICoin } from '../common/types';
import { GET_COIN_PRICE_QUERY } from '../graphql/Queries';

export const useLazyFetchCoin = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    const coins = localStorage.getItem('coinsInfo');
    if (coins) {
      setCoins(JSON.parse(coins));
    }
  }, []);

  const [getData, { loading, error }] = useLazyQuery(GET_COIN_PRICE_QUERY, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const hasSameCoin = coins.some((f) => f.id === data.markets[0]?.id);
      if (data.markets.length && !hasSameCoin) {
        setCoins([...coins, data.markets[0]]);
        localStorage.setItem('coinsInfo', JSON.stringify([...coins, data.markets[0]]));
      } else if (data.markets.length <= 0) {
        alert('coin not found');
      }
      if (hasSameCoin) {
        alert('has same value');
      }
    }
  });

  return { coins, setCoins, getData, loading, error };
};
