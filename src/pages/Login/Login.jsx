import { Link, useNavigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Button from '@/UI/Button';
import styles from './Login.module.css';
import GoogleIcon from '@/assets/images/google.svg';
import LoginForm from '@/Components/LoginForm';
import LoginAnimation from '@/assets/lottie/login-animation.json';
import { signInWithGoogle } from '@/lib/firebase';
import useUser from '@/hooks/useUser';
import Container from '@/UI/Container';

export default function Login() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (user) {
    return navigate(-1);
  }

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <DotLottieReact
          data={LoginAnimation}
          loop
          autoplay
          className={styles.loginAnimation}
        />
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Every Tail Deserves a Happy Ending</h2>
            <p>
              Sign in to continue your journey in helping pets find their way
              home.
            </p>
          </div>
          <LoginForm />
          <div className={styles.separator}>Or</div>
          <Button
            className={styles.googleButton}
            variant="outline"
            onClick={signInWithGoogle}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
          <div className={styles.createAccount}>
            <span>Not a member ? </span>
            <Link to="/signup">
              <span>Create an account</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
