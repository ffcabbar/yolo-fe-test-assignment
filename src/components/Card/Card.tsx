import { LazyQueryExecFunction, OperationVariables } from '@apollo/client';
import { useState } from 'react';
import { alertNotification } from '../../helpers/alert-notification';
import { Notification } from '../../common/enums';
import { Button } from '../lib/Button/Button';
import { Input } from '../lib/Input/Input';
import styles from './Card.module.scss';

type Props = {
  getData: LazyQueryExecFunction<any, OperationVariables>;
};

export const Card = ({ getData }: Props) => {
  const [code, setCode] = useState('');

  const handleChange = (e: any) => {
    setCode(e.target.value);
  };

  const onClick = () => {
    if (code) {
      setCode('');
      getData({
        variables: { code }
      });
    } else {
      alertNotification('Please enter a code !', Notification.WARNING);
    }
  };

  return (
    <div className={styles.wrapper} data-testid="card">
      <div>
        <Input placeholder="BTC" value={code} onChange={handleChange} data-testid="search-box" />
      </div>
      <div>
        <Button onClick={onClick} data-testid="button">
          Add
        </Button>
      </div>
      <div>
        <div>Use of this service is subject to terms and conditions.</div>
      </div>
    </div>
  );
};
