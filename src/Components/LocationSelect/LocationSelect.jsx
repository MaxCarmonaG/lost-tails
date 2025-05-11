import { Select, Spin } from 'antd';
import { useState } from 'react';
import debounce from 'debounce';
import { getCoordinatesFromAddress } from '@/lib/nominatim';
import styles from './LocationSelect.module.css';

export default function LocationSelect({
  label,
  name,
  placeholder,
  value,
  handleChange,
  onBlur,
  error,
  required,
}) {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchOptions = async (value) => {
    if (value && value.length > 4) {
      setFetching(true);
      const addressList = await getCoordinatesFromAddress(value);
      setOptions(addressList);
      setFetching(false);
    }
  };

  return (
    <div className={styles.control}>
      <label aria-required={required} className={styles.label} htmlFor={name}>
        {label}
      </label>
      <Select
        value={value}
        filterOption={false}
        id={name}
        title={name}
        className={styles.select}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onSearch={debounce(fetchOptions, 500)}
        onBlur={onBlur}
        showSearch
        allowClear
        onClear={() => setOptions([])}
        status={error && 'error'}
      />
      {!!error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
