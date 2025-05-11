import useUser from '@/hooks/useUser';
import { logout } from '@/lib/firebase';
import Button from '@/UI/Button';
import { useNavigate } from 'react-router';

export default function LoginButton() {
  const { user } = useUser();
  const navigate = useNavigate();

  // Function to handle the button click
  const handleLogin = () => {
    navigate('/login');
  };

  return !user ? (
    <Button onClick={handleLogin}>Log In</Button>
  ) : (
    <Button onClick={logout}>Logout</Button>
  );
}
