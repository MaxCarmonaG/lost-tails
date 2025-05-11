import DonationBanner from '@/assets/images/donationBanner.svg';
import styles from './Donation.module.css';
import Container from '@/UI/Container';
import DonationForm from '@/Components/DonationForm';
import DonationCard from '@/Components/DonationCard/DonationCard';
import { useEffect, useState } from 'react';
import { listenToDonations } from '@/lib/firebase';

export default function Donation() {
  const [donationsData, setDonationsData] = useState([]);

  useEffect(() => {
    // Listen to Firestore changes (when new donation is added)
    const unsubscribe = listenToDonations((updatedDonations) => {
      setDonationsData(updatedDonations);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.sectionInfo}>
          <h1>Support Our Cause</h1>
          <p>
            Every day, countless pets are lost, abandoned, or in need of a
            loving home.
            <br /> <strong>Your donation</strong> can make a life-changing
            difference for friends.
          </p>
          <DonationBanner className={styles.banner} />
        </div>
        <div className={styles.sectionMainContent}>
          <DonationForm />
          <div className={styles.sectionLastDonations}>
            <h2>Last Donations</h2>
            {donationsData.length > 0 ? (
              donationsData.map((doc) => (
                <DonationCard
                  name={doc.name}
                  amount={doc.amount}
                  id={doc.id}
                  key={doc.id}
                />
              ))
            ) : (
              <p>We do not have donations yet... Become the first one!</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
