import { useState } from 'react';

const defaultFilter = {
  status: '',
  breed: '',
  color: '',
  size: '',
  gender: '',
  species: '',
};

export default function usePetsFilter({ data, setter }) {
  const [filter, setFilter] = useState(defaultFilter);

  const applyFilter = (newFilter) => {
    let copy = [...data];

    for (const [key, value] of Object.entries(newFilter)) {
      if (value) {
        copy = copy.filter((e) => e[key] === value);
      }
    }

    setter(copy);

    return newFilter;
  };

  const sortByDate = (checked) =>
    setter((prev) =>
      [...prev].sort((a, b) => (checked ? a.date - b.date : b.date - a.date)),
    );

  const clearFilter = () => setFilter(() => applyFilter(defaultFilter));

  const getOptions = (target) => {
    const values = data.reduce(
      (acc, cur) => (acc.includes(cur[target]) ? acc : [...acc, cur[target]]),
      [],
    );

    return values.map((value) => ({
      value,
      label: <span style={{ textTransform: 'capitalize' }}>{value}</span>,
      target,
    }));
  };

  const handleChangeFilter = (value, options) => {
    if (!value) return;
    setFilter((prev) => applyFilter({ ...prev, [options.target]: value }));
  };

  const handleClearFilter = (target) => {
    setFilter((prev) => applyFilter({ ...prev, [target]: '' }));
  };

  const handleSortByDate = (e) => sortByDate(e.target.checked);

  return {
    handleChangeFilter,
    handleClearFilter,
    handleSortByDate,
    getOptions,
    clearFilter,
    filter,
    filtersList: Object.keys(filter),
  };
}
