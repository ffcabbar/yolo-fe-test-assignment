import { ToastContainer } from 'react-toastify';
import styles from './App.module.scss';
import { Card, CoinList, Footer, Header } from './components';
import { useLazyFetchCoin } from './hooks/useLazyFetchCoin';

const App = () => {
  const { coins, setCoins, getData, loading, error } = useLazyFetchCoin();

  if (error) {
    return <>Something went wrong! {error}</>;
  }

  return (
    <div>
      <ToastContainer />
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
