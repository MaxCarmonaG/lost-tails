import styles from './AdoptionPetLoading.module.css';

export default function AdoptionPetLoading({ length }) {
  const arr = Array.from({ length }, (_, i) => i);
  return arr.map((key) => (
    <article key={key} className={styles.container}>
      <span className={styles.name}></span>
      <span className={styles.location}></span>
      <span className={styles.picture}></span>
      <span className={styles.link}></span>
    </article>
  ));
}
