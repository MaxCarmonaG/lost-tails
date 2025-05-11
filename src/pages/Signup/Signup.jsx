import { Link, Navigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './Signup.module.css';
import SignupForm from '@/Components/SignupForm';
import SignupAnimation from '@/assets/lottie/signup-animation.json';
import Container from '@/UI/Container';
import useUser from '@/hooks/useUser';

export default function Signup() {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.animationContainer}>
          <DotLottieReact
            data={SignupAnimation}
            loop
            autoplay
            className={styles.signupAnimation}
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Join the Community – Help Pets Find Their Way Home!</h2>
            <p>
              Create an account to report lost pets, search for found pets, and
              adopt loving companions.
            </p>
          </div>
          <SignupForm />
          <p className={styles.loginRedirect}>
            Already have an account?{' '}
            <Link to="/login" className={styles.loginLink}>
              Log In
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
