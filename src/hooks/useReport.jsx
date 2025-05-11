import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getReport } from '@/lib/firebase';
import { getAddressFromCoordinates } from '@/lib/nominatim';

const useReport = () => {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getReportWithLocation = async (id) => {
    const data = await getReport(id);

    if (!data) return;

    const validateLocation = (location) =>
      Array.isArray(location) &&
      location.length === 2 &&
      location.every((e) => e);

    if (validateLocation(data.lostLocation)) {
      const [lat, lng] = data.lostLocation;
      data.coordinates = [lat, lng];
      data.lostAddress = await getAddressFromCoordinates(lat, lng);
    } else {
      data.lostAddress = 'Unknown location';
    }

    if (validateLocation(data.foundLocation)) {
      const [lat, lng] = data.foundLocation;
      data.coordinates = [lat, lng];
      data.foundAddress = await getAddressFromCoordinates(lat, lng);
    } else {
      data.foundAddress = 'Unknown location';
    }

    return data;
  };

  useEffect(() => {
    setLoading(true);
    getReportWithLocation(id).then((data) => {
      setReport(data);
      setLoading(false);
      console.log(data);
    });
  }, [id]);

  return {
    report,
    loading,
  };
};

export default useReport;
