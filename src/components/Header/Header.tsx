import styles from './Header.module.scss';
import logo from '../../logo.svg';

export const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
};
