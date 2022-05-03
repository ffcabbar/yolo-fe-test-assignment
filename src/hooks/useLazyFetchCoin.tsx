import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ICoin } from '../common/types';
import { GET_COIN_PRICE_QUERY } from '../graphql/Queries';
import { alertNotification } from '../helpers/alert-notification';
import { Notification } from '../common/enums';

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
        const allCoins = [...coins, data.markets[0]];
        setCoins(allCoins);
        localStorage.setItem('coinsInfo', JSON.stringify(allCoins));
      } else if (data.markets.length <= 0) {
        alertNotification('Coin not found !', Notification.ERROR);
      }
      if (hasSameCoin) {
        alertNotification('This coin already exists on your list !', Notification.WARNING);
      }
    }
  });

  return { coins, setCoins, getData, loading, error };
};
