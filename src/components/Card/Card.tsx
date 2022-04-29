import { Button } from '../lib/Button/Button';
import { Input } from '../lib/Input/Input';
import styles from './Card.module.scss';

export const Card = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Input placeholder="BTC" />
      </div>
      <div>
        <Button>Add</Button>
      </div>
      <div>Use of this service is subject to terms and conditions.</div>
    </div>
  );
};
