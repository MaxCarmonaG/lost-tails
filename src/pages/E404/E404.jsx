import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Container from '@/UI/Container';
import PetNotFoundAnimation from '@/assets/lottie/petnotfound-animation.json';
import styles from './E404.module.css';

export default function E404() {
  return (
    <Container className={styles.notFoundContainer}>
      <h2>Sorry, this page doesn&apos;t esist.</h2>
      <DotLottieReact
        data={PetNotFoundAnimation}
        loop
        autoplay
        className={styles.PetNotFoundAnimation}
      />
    </Container>
  );
}
