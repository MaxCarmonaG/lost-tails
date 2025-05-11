import styles from './PetLoading.module.css';

export default function PetLoading({ length }) {
  const arr = Array.from({ length }, (_, i) => i);
  return arr.map((key) => (
    <article key={key} className={styles.container}>
      <div className={styles.header}>
        <span className={styles.img}></span>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.h3}></span>
          <span className={styles.p}></span>
        </div>
        <span className={styles.gender}></span>
      </div>
    </article>
  ));
}
