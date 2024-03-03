import styles from './Button.module.css';

const Button = ({ onClick, name, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    className={styles.Button}
    disabled={disabled}
  >
    {name}
  </button>
);

export default Button;
