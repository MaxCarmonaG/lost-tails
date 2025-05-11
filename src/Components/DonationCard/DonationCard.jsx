import styles from './DonationCard.module.css';

export default function DonationCard({ name, amount }) {
  return (
    <div className={styles.donationCard}>
      <p>{name}</p>
      <p>${amount}</p>
    </div>
  );
}
