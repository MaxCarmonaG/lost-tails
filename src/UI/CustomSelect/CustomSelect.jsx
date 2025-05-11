import { Select } from 'antd';
import styles from './CustomSelect.module.css';

export default function CustomSelect({
  value,
  name,
  label,
  handleChange,
  onBlur,
  handleClear,
  options,
  className = '',
  placeholder,
  error,
  required,
}) {
  return (
    <div className={`${styles.control} ${className}`.trim()}>
      <label aria-required={required} className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.validationWrapper}>
        <Select
          value={value}
          id={name}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          allowClear
          onClear={() => handleClear && handleClear()}
          onBlur={onBlur}
          status={error && 'error'}
        />
        {!!error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    </div>
  );
}
