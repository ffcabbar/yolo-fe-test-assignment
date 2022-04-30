import styles from './App.module.scss';
import { Card, CoinList, Footer, Header } from './components';

const App = () => {
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
              <Card />
            </div>
          </div>
          <div className={styles.coinListSection}>
            <CoinList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
