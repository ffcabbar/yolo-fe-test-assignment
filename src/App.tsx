import styles from './App.module.scss';
import { Card, CoinList, Header } from './components';

const App = () => {
  return (
    <div>
      <main className={styles.main}>
        {/* <div className={styles.figure}></div> */}
        {/* <div className={styles.bg}></div> */}
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
      {/* <div className={styles.footer}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore necessitatibus in quas,
        similique, porro, earum sequi ullam quasi numquam molestias illum provident cum odit cumque
        illo nisi sapiente consectetur iure.
      </div> */}
    </div>
  );
};

export default App;
