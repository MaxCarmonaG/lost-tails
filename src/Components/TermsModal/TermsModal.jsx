import styles from './TermsModal.module.css';
import Button from '@/UI/Button';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Terms & Conditions</h2>
        <p>
          By using this service, you agree to our Terms & Privacy Policy. This
          includes guidelines for reporting lost pets, adoption policies, and
          responsible pet ownership.
        </p>
        <p>
          You also consent to the collection of necessary data for account
          security and service improvements.
        </p>
        <Button
          variant="outline"
          onClick={onClose}
          className={styles.closeButton}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
