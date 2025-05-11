import { sanitizeInput } from '@/lib/utils';
import { useState } from 'react';

export default function useForm({ defaultFormData, defaultFormError }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [formError, setFormError] = useState(defaultFormError);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelect = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;

    if (!(name in formError)) return;

    let error = '';

    const resolve = () => setFormError((prev) => ({ ...prev, [name]: error }));

    if (Array.isArray(value) && !value.length) {
      error = name + ' is required!';
      return resolve();
    }

    if (!value || !value?.trim()) {
      error = name + ' is required!';
      return resolve();
    }

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name === 'email' && !emailValidator.test(value)) {
      error = 'email is invalid!';
      return resolve();
    }

    if (name === 'password' && value.length < 8) {
      error = 'password at least 8 characters long!';
      return resolve();
    }

    if (name === 'confirmPassword' && formData.confirmPassword !== undefined) {
      if (value !== formData.password) {
        error = 'Passwords do not match!';
      }
      return resolve();
    }

    return resolve();
  };

  const clearForm = () => setFormData(defaultFormData);

  return {
    formData,
    formError,
    handleChange,
    handleCheck,
    handleBlur,
    handleSelect,
    clearForm,
  };
}
