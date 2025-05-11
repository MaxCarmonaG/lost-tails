import { message } from 'antd';
import { useState } from 'react';
import useForm from '@/hooks/useForm';
import Button from '@/UI/Button';
import CustomInput from '@/UI/CustomInput';
import styles from './SignupForm.module.css';
import { registerUser } from '@/lib/firebase';
import TermsModal from '@/Components/TermsModal';
import { SIGN_UP } from './data';

export default function SignupForm() {
  const { formData, formError, handleChange, handleBlur, handleCheck } =
    useForm({
      defaultFormData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
      },
      defaultFormError: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    });

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      return messageApi.error('You must agree to the Terms & Privacy Policy.');
    }

    if (Object.values(formError).some((e) => e)) {
      return messageApi.error('This form has errors.');
    }

    const response = await registerUser(formData);

    if (!response.success) {
      return messageApi.error(response.message);
    }
  };

  return (
    <>
      {contextHolder}
      <form className={styles.form} onSubmit={handleSubmit}>
        {SIGN_UP.map((item) => {
          if (Array.isArray(item)) {
            return (
              <div className={styles.row} key={item[0].id}>
                {item.map((input) => (
                  <CustomInput
                    key={input.id}
                    value={formData[input.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formError[input.name]}
                    required
                    {...input}
                  />
                ))}
              </div>
            );
          }
          return (
            <CustomInput
              key={item.id}
              value={formData[item.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={formError[item.name]}
              required
              {...item}
            />
          );
        })}
        <div className={styles.rememberControl}>
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleCheck}
            />
            I agree to the{' '}
            <span
              className={styles.termsLink}
              onClick={() => setIsModalOpen(true)}
            >
              Terms & Privacy Policy
            </span>
          </label>
        </div>

        <TermsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div className={styles.buttonContainer}>
          <Button className={styles.formSubmit} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
}
