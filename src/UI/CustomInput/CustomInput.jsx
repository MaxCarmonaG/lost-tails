import { Input } from 'antd';
import styles from './CustomInput.module.css';

export default function CustomInput({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
}) {
  return (
    <div className={styles.formControl}>
      <label aria-required={required} htmlFor={id}>
        {label}
      </label>
      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        status={error && 'error'}
      />
      {!!error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
