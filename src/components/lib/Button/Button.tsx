import styles from './Button.module.scss';

type ButtonProps = {
  children?: React.ReactNode;
};

type A = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type Props = ButtonProps & A;

export const Button = ({ children, ...rest }: Props) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};
