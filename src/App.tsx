import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Card, CoinList, Footer, Header } from './components';
import { useLazyQuery } from '@apollo/client';
import { GET_COIN_PRICE_QUERY } from './graphql/Queries';
import { ICoin } from './common/types';

const App = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);

  const [getData, { loading, data, error }] = useLazyQuery(GET_COIN_PRICE_QUERY, {
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

  useEffect(() => {
    const coins = localStorage.getItem('coinsInfo');
    if (coins) {
      setCoins(JSON.parse(coins));
    }
  }, []);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.container}>
          <Header />
          <div className={styles.innerSection}>
            <div className={styles.descriptionSection}>
              <h1>Now you can track all your cryptos here!</h1>
              <h2>Just enter the cryptocurrency code on the form to the right.</h2>
            </div>
            <div>
              <Card getData={getData} />
            </div>
          </div>
          <div className={styles.coinListSection}>
            <CoinList loading={loading} coins={coins} setCoins={setCoins} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
