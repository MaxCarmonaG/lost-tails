import { getAdoptionPets } from '@/lib/petFinder';
import { useEffect, useState } from 'react';

export default function useAdoptionPet(options) {
  const { limit } = options || {};

  const [adoptionPets, setAdoptionPets] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdoptionPets(limit).then((petList) => {
      setAdoptionPets(petList);
      setLoading(false);
    });
  }, [limit]);

  useEffect(() => {
    setList(adoptionPets);
  }, [adoptionPets]);

  return {
    adoptionPets,
    list,
    setList,
    loading,
  };
}
