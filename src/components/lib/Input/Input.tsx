import styles from './Input.module.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ ...rest }: Props) => {
  return (
    <div>
      <input role="searchbox" className={styles.input} {...rest} />
    </div>
  );
};
