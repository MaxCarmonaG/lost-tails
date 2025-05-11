import { Button, Checkbox } from 'antd';
import styles from './PetsFilter.module.css';
import usePetsFilter from '@/hooks/usePetsFilterSelect';
import CustomSelect from '@/UI/CustomSelect';

export default function PetsFilter({ data, setter }) {
  const {
    handleChangeFilter,
    handleClearFilter,
    handleSortByDate,
    getOptions,
    clearFilter,
    filter,
    filtersList,
  } = usePetsFilter({ data, setter });

  return (
    <aside className={styles.aside}>
      {filtersList.map((key) => (
        <CustomSelect
          key={key}
          name={key}
          label={key}
          value={filter[key] || []}
          handleChange={handleChangeFilter}
          handleClear={() => handleClearFilter(key)}
          options={getOptions(key)}
          placeholder={`Filter by ${key}`}
          className={styles.select}
        />
      ))}
      <div className={styles.control}>
        <Checkbox onChange={handleSortByDate}>Sort by date</Checkbox>
        <Button color="danger" variant="solid" onClick={clearFilter}>
          Clear Filter
        </Button>
      </div>
    </aside>
  );
}
