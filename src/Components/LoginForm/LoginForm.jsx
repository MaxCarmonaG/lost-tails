import { useState } from 'react';
import { message } from 'antd';
import Button from '@/UI/Button';
import styles from './LoginForm.module.css';
import { login } from '@/lib/firebase';
import CustomInput from '@/UI/CustomInput';
import useForm from '@/hooks/useForm';
import RememberPassword from '@/Components/RememberPassword';

export default function LoginForm() {
  const { formData, formError, handleChange, handleCheck, handleBlur } =
    useForm({
      defaultFormData: { email: '', password: '', remember: false },
      defaultFormError: { email: '', password: '' },
    });

  const [hasSubmitError, setHasOnSubmitError] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = Object.values(formError).some((e) => e);

    if (hasError) {
      return messageApi.open({
        type: 'error',
        content: 'This form has errors',
      });
    }

    const { email, password, remember } = formData;

    login(email, password, remember, () => setHasOnSubmitError(true));
  };

  return (
    <>
      {contextHolder}
      <form className={styles.form} onSubmit={handleSubmit}>
        <CustomInput
          label={'Email address'}
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formError.email}
          required
        />
        <CustomInput
          label={'Password'}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formError.password}
          required
        />
        <div className={styles.rememberControl}>
          <label>
            <input type="checkbox" name="remember" onChange={handleCheck} />
            Remember me
          </label>
          <RememberPassword>Forgot your password?</RememberPassword>
        </div>
        <Button className={styles.formSubmit} type="submit">
          Log In
        </Button>
        {hasSubmitError && (
          <span className={styles.errorSubmit}>
            Error: The username or password you entered is incorrect.
          </span>
        )}
      </form>
    </>
  );
}
