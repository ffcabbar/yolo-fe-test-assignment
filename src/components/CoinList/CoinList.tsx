import styles from './CoinList.module.scss';
import deleteIcon from '../../deleteIcon.svg';
import icon from '../../icon.svg';
import { ICoin } from '../../common/types';
import { Loader } from '../Loader/Loader';

type Props = {
  loading: boolean;
  coins: ICoin[];
  setCoins: React.Dispatch<React.SetStateAction<ICoin[]>>;
};

export const CoinList = ({ loading, coins, setCoins }: Props) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  const deleteCoin = (id: string) => {
    const filteredCoins = coins.filter((c) => c.id !== id);
    setCoins(filteredCoins);
    localStorage.setItem('coinsInfo', JSON.stringify(filteredCoins));
  };

  return (
    <>
      {coins.map((coin, idx) => {
        return (
          <div className={styles.wrapper} key={`${coin.id}_${idx}`}>
            <div className={styles.leftSection}>
              <div>
                <img src={icon} alt="icon" />
              </div>
              <div className={styles.price}>
                <div>{coin.baseSymbol}</div>
                <div>{coin.ticker.lastPrice.substring(0, 8)} &euro;</div>
              </div>
            </div>
            <div className={styles.delete} onClick={() => deleteCoin(coin.id)}>
              <img src={deleteIcon} alt="deleteIcon" />
            </div>
          </div>
        );
      })}
    </>
  );
};
