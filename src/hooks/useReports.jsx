import { useState, useEffect } from 'react';
import { reportsObserver } from '@/lib/firebase';

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = reportsObserver((data) => {
      setReports(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setList(reports);
  }, [reports]);

  return {
    reports,
    list,
    setList,
    loading,
  };
};

export default useReports;
