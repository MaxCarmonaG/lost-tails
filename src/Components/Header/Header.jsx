import Navigation from '@/Components/Navigation/Navigation';
import LoginButton from '@/Components/LoginButton/LoginButton';
import styles from './Header.module.css';
import logo from '@/assets/images/logo.svg?url';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <LoginButton />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.logoAndNav}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
