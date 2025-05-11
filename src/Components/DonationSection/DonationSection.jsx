import Container from '@/UI/Container';
import styles from './DonationSection.module.css';
import Button from '@/UI/Button';
import { useNavigate } from 'react-router';
import DonationIcon from '@/assets/images/donationIcon.svg';

const DonationSection = () => {
  const navigate = useNavigate();

  // redirect page when click button on donation home section
  const handleRedirect = () => navigate('/donation');

  return (
    <section className={styles.donationSection}>
      <Container>
        <div className={styles.donationMainContent}>
          <div className={styles.donationText}>
            <h2>Support Our Cause</h2>
            <p>
              By donating to our cause, you are supporting animal rescues and
              shelters,{' '}
              <strong>
                helping animals in need, and giving back to the community.{' '}
              </strong>
              A small portion also helps keep our platform running, so we can
              continue making a difference together!
            </p>
          </div>
          <DonationIcon className={styles.donationIcon} />
        </div>
        <Button className={styles.btn} onClick={handleRedirect}>
          Donate Now
        </Button>
      </Container>
    </section>
  );
};

export default DonationSection;
