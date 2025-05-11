import { useState } from 'react';
import { message, Modal } from 'antd';
import useForm from '@/hooks/useForm';
import styles from './RememberPassword.module.css';
import CustomInput from '@/UI/CustomInput';
import Button from '@/UI/Button';
import { resetPassword } from '@/lib/firebase';

export default function RememberPassword({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formData, formError, handleChange, handleBlur } = useForm({
    defaultFormData: { email: '' },
    defaultFormError: { email: '' },
  });

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    if (formError.email) return;

    const { email } = formData;

    await resetPassword(email, (content) =>
      messageApi.open({
        type: 'success',
        content,
      }),
    );

    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </button>
      <Modal
        title="Forgot your password?"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className={styles.body}>
          <p>We&apos;ll email you a link to reset your password.</p>
          <CustomInput
            label={'Email address'}
            type="email"
            name="email"
            id="name"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formError.email}
          />
          <Button onClick={handleSubmit}>Reset password</Button>
        </div>
      </Modal>
    </>
  );
}
