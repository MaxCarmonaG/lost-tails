import { Client } from '@petfinder/petfinder-js';

const getLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return `${json.city}, ${json.region_code}`;
  } catch (e) {
    console.error(e);
    return 'London, ON';
  }
};

const client = new Client({
  apiKey: import.meta.env.VITE_PET_FINDER_API_KEY,
  secret: import.meta.env.VITE_PET_FINDER_SECRET,
});

export const getAdoptionPets = async (limit = 50) => {
  const cachedData = sessionStorage.getItem('petfinder');

  if (cachedData) {
    const data = JSON.parse(cachedData);

    if (limit <= data.length) {
      return data.slice(0, limit);
    }
  }

  const location = await getLocation();

  const {
    data: { animals },
  } = (await client.animal.search({
    location: location,
    limit,
    distance: 50,
  })) || { data: { animals: [] } };

  const adoptionPets = animals.map(
    ({
      id,
      name,
      description,
      species,
      colors,
      size,
      gender,
      breeds,
      primary_photo_cropped: photo,
      status,
      url,
      published_at,
      contact,
    }) => ({
      id,
      name,
      description,
      species,
      color: colors.primary || 'Not set',
      size,
      gender,
      breed: breeds.primary,
      picture: photo?.small || 'None',
      status,
      url,
      date: new Date(published_at).getTime(),
      city: contact.address.city,
      state: contact.address.state,
    }),
  );

  sessionStorage.setItem('petfinder', JSON.stringify(adoptionPets));

  return adoptionPets;
};
