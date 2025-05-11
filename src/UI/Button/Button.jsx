import { Tooltip } from 'antd';
import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  onClick = () => {},
  children,
  disabled,
  tooltip = null,
}) {
  return (
    <Tooltip title={disabled ? tooltip : null}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.btn} ${styles[variant] ?? styles.primary} ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    </Tooltip>
  );
}
