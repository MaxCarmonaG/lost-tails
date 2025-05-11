import styles from './Pet.module.css';
import { IoMale, IoFemale } from 'react-icons/io5';

export default function Pet({ picture, status, name, breed, gender }) {
  return (
    <article className={styles.container}>
      <div className={styles.header}>
        <img src={picture} alt={name} className={styles.img} />
        <span className={`${styles.tag} ${styles[status]}`}>{status}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3>{name}</h3>
          <p>{breed}</p>
        </div>
        <span className={styles.gender}>
          {gender === 'male' ? <IoMale /> : <IoFemale />}
        </span>
      </div>
    </article>
  );
}
