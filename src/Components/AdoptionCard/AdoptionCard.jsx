import styles from './AdoptionCard.module.css';
import RedirectIcon from '@/assets/images/redirectArrow.svg';

export default function AdoptionCard({ animal }) {
  if (animal) {
    return (
      <div className={styles.adoptionCard}>
        <div className={styles.cardTitle}>
          <h4>{animal.name}</h4>
          <p>
            {animal.contact.address.city}, {animal.contact.address.state}
          </p>
        </div>
        <img src={animal.primary_photo_cropped.small} />
        <div className={styles.cardLink}>
          <a href={animal.url} target="_blank" rel="noopener noreferrer">
            More details
          </a>
          <RedirectIcon />
        </div>
      </div>
    );
  }
}
