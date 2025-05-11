import { GeoPoint } from 'firebase/firestore';

export let lostPet = {
  name: 'Bean', // The name of the animal
  description: 'She has a small white spot under her chin.', // Extra details about the animal
  type: 'cat',
  colors: {
    // All from ["Beige", "Black", "Brown", "Golden", "Gray", "Orange", "White", null]
    primary: 'Black',
    secondary: null,
    tertiary: null,
  },
  size: 'Medium', // From ["Small", "Medium", "Large", "Extra Large", null]
  gender: 'Female', // From ["Male", "Female", null]
  breeds: {
    // Not sure how to impliment this yet. Need to figure out how we want to store the list on the front end. Breed list changes based on animal
    primary: 'Unknown', // Breed 1
    secondary: null, // Breed 2
  },
  picture: 'https://picsum.photos/200', // Picture of the pet
  lostLocation: new GeoPoint(42.605255, -81.609216), // Firestore GeoPoint of where the pet was lost
  foundLocation: new GeoPoint(42.605255, -81.609216), // Firestore GeoPoint of where the pet was found
  status: 'Complete', // From ["Lost", "Found", "Complete"]
};

export const dummyReports = [
  {
    name: 'Bean', // The name of the animal
    description: 'A timid black cat with a small white spot under her chin.',
    type: 'cat',
    colors: {
      primary: 'Black',
      secondary: null,
      tertiary: null,
    },
    size: 'Medium',
    gender: 'Female',
    breeds: {
      primary: 'Domestic Shorthair',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=1',
    lostLocation: new GeoPoint(42.605255, -81.609216),
    foundLocation: new GeoPoint(42.605255, -81.609216),
    status: 'Complete',
  },
  {
    name: 'Max',
    description:
      'An energetic golden retriever that loves to play fetch in the park.',
    type: 'dog',
    colors: {
      primary: 'Golden',
      secondary: 'White',
      tertiary: null,
    },
    size: 'Large',
    gender: 'Male',
    breeds: {
      primary: 'Golden Retriever',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=2',
    lostLocation: new GeoPoint(42.612345, -81.610123),
    foundLocation: null,
    status: 'Lost',
  },
  {
    name: 'Bella',
    description:
      'A gentle dog with a mix of brown and black fur, found wandering near a busy street. Breed unknown.',
    type: 'dog',
    colors: {
      primary: 'Brown',
      secondary: 'Black',
      tertiary: null,
    },
    size: 'Medium',
    gender: 'Female',
    breeds: {
      primary: 'Unknown',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=3',
    lostLocation: null,
    foundLocation: new GeoPoint(42.598765, -81.615432),
    status: 'Found',
  },
  {
    name: 'Luna',
    description:
      'A curious gray and white cat often seen near the neighborhood park.',
    type: 'cat',
    colors: {
      primary: 'Gray',
      secondary: 'White',
      tertiary: null,
    },
    size: 'Small',
    gender: 'Female',
    breeds: {
      primary: 'Siamese',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=4',
    lostLocation: new GeoPoint(42.60789, -81.62),
    foundLocation: null,
    status: 'Lost',
  },
  {
    name: 'Charlie',
    description:
      'A playful dog spotted near the downtown area with a striking black and brown coat.',
    type: 'dog',
    colors: {
      primary: 'Black',
      secondary: 'Brown',
      tertiary: null,
    },
    size: 'Medium',
    gender: 'Male',
    breeds: {
      primary: 'Beagle',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=5',
    lostLocation: new GeoPoint(42.6, -81.605),
    foundLocation: new GeoPoint(42.6, -81.605),
    status: 'Complete',
  },
  {
    name: 'Simba',
    description:
      'A regal-looking cat with a striking orange and white coat, found near a local market. Breed unknown.',
    type: 'cat',
    colors: {
      primary: 'Orange',
      secondary: 'White',
      tertiary: null,
    },
    size: 'Large',
    gender: 'Male',
    breeds: {
      primary: 'Unknown', // Breed not determined by the finder
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=6',
    lostLocation: null,
    foundLocation: new GeoPoint(42.611111, -81.606666),
    status: 'Found',
  },
  {
    name: 'Rocky',
    description:
      'A strong and brave dog with a rugged appearance, last seen near the river.',
    type: 'dog',
    colors: {
      primary: 'Brown',
      secondary: 'Golden',
      tertiary: null,
    },
    size: 'Extra Large',
    gender: 'Male',
    breeds: {
      primary: 'German Shepherd',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=7',
    lostLocation: new GeoPoint(42.62, -81.6),
    foundLocation: null,
    status: 'Lost',
  },
  {
    name: 'Chloe',
    description:
      'A sweet cat with a distinctive gray and beige coat, known for her affectionate nature.',
    type: 'cat',
    colors: {
      primary: 'Gray',
      secondary: 'Beige',
      tertiary: null,
    },
    size: 'Small',
    gender: 'Female',
    breeds: {
      primary: 'Persian',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=8',
    lostLocation: new GeoPoint(42.603, -81.608),
    foundLocation: new GeoPoint(42.603, -81.608),
    status: 'Complete',
  },
  {
    name: 'Daisy',
    description:
      'A friendly dog with a mix of black and brown patches, last seen near the suburban park.',
    type: 'dog',
    colors: {
      primary: 'Black',
      secondary: 'Brown',
      tertiary: null,
    },
    size: 'Medium',
    gender: 'Female',
    breeds: {
      primary: 'Border Collie',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=9',
    lostLocation: new GeoPoint(42.615, -81.612),
    foundLocation: null,
    status: 'Lost',
  },
  {
    name: 'Milo',
    description:
      'A playful cat found near the local grocery store. Breed unknown.',
    type: 'cat',
    colors: {
      primary: 'White',
      secondary: 'Gray',
      tertiary: null,
    },
    size: 'Small',
    gender: 'Male',
    breeds: {
      primary: 'Unknown',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=10',
    lostLocation: null,
    foundLocation: new GeoPoint(42.609, -81.614),
    status: 'Found',
  },
  {
    name: 'Sophie',
    description:
      'A calm and well-behaved dog, known for her gentle eyes and friendly demeanor.',
    type: 'dog',
    colors: {
      primary: 'Beige',
      secondary: null,
      tertiary: null,
    },
    size: 'Medium',
    gender: 'Female',
    breeds: {
      primary: 'Labrador Retriever',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=11',
    lostLocation: new GeoPoint(42.6065, -81.611),
    foundLocation: new GeoPoint(42.6065, -81.611),
    status: 'Complete',
  },
  {
    name: 'Duke',
    description:
      'A robust dog with a muscular build, last seen roaming near the industrial area.',
    type: 'dog',
    colors: {
      primary: 'Black',
      secondary: 'Golden',
      tertiary: null,
    },
    size: 'Extra Large',
    gender: 'Male',
    breeds: {
      primary: 'Rottweiler',
      secondary: null,
    },
    picture: 'https://picsum.photos/200?random=12',
    lostLocation: new GeoPoint(42.622, -81.607),
    foundLocation: null,
    status: 'Lost',
  },
];
