import { Outlet } from 'react-router';
import styles from './LostFound.module.css';

export default function LostFound() {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
}
