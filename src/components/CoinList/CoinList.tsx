import styles from './CoinList.module.scss';
import deleteIcon from '../../deleteIcon.svg';
import icon from '../../icon.svg';

export const CoinList = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.leftSection}>
          <div>
            <img src={icon} alt="icon" />
          </div>
          <div className={styles.price}>
            <div>BTC</div>
            <div>7842.27 &euro;</div>
          </div>
        </div>
        <div className={styles.delete}>
          <img src={deleteIcon} alt="deleteIcon" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.leftSection}>
          <div>
            <img src={icon} alt="icon" />
          </div>
          <div className={styles.price}>
            <div>BTC</div>
            <div>7842.27 &euro;</div>
          </div>
        </div>
        <div className={styles.delete}>
          <img src={deleteIcon} alt="deleteIcon" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.leftSection}>
          <div>
            <img src={icon} alt="icon" />
          </div>
          <div className={styles.price}>
            <div>BTC</div>
            <div>7842.27 &euro;</div>
          </div>
        </div>
        <div className={styles.delete}>
          <img src={deleteIcon} alt="deleteIcon" />
        </div>
      </div>
    </>
  );
};
