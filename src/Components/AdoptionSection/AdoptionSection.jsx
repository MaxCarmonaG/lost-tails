import styles from './AdoptionSection.module.css';
import mockData from './mockData.json';
import Container from '@/UI/Container';
import Button from '@/UI/Button';
import { useNavigate } from 'react-router';
import AdoptionPet from '../AdoptionPet';
import useAdoptionPet from '@/hooks/useAdoptionPet';

export default function AdoptionSection() {
  const navigate = useNavigate();
  const { adoptionPets } = useAdoptionPet({ limit: 3 });

  // redirect page when click button on adoption home section
  const handleRedirect = () => navigate('/adoption');

  const petList = adoptionPets.length
    ? adoptionPets
    : mockData.map(({ primary_photo_cropped, ...rest }) => ({
        ...rest,
        picture: primary_photo_cropped?.small || 'None',
      }));

  return (
    <section className={styles.adoptionSection}>
      <Container>
        <div className={styles.adoptionText}>
          <h2>Adoption</h2>
          <p>
            At Lostails, <strong>we connect you</strong> with shelters to help
            find loving homes.
          </p>
          <p>
            <strong>Check some available:</strong>
          </p>
        </div>
        <div className={styles.exampleCards}>
          {petList.map(({ id, picture, name, url, species, city, state }) => (
            <AdoptionPet
              key={id}
              picture={picture}
              name={name}
              url={url}
              species={species}
              city={city}
              state={state}
            />
          ))}
        </div>
        <Button className={styles.btn} onClick={handleRedirect}>
          See All
        </Button>
      </Container>
    </section>
  );
}
