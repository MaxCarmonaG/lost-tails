import useForm from '@/hooks/useForm';
import Container from '@/UI/Container';
import CustomInput from '@/UI/CustomInput';
import { message, Radio } from 'antd';
import styles from './NewReport.module.css';
import Button from '@/UI/Button';
import LocationSelect from '../LocationSelect';
import { NEW_REPORT, COMPONENTS } from './data';
import CustomSelect from '@/UI/CustomSelect';
import UploadImage from '@/UI/UploadImage';
import { uploadImage } from '@/lib/imgbb';
import { auth, createReport } from '@/lib/firebase';
import { Navigate } from 'react-router';
import useUser from '@/hooks/useUser';

export default function NewReport() {
  const {
    formData,
    formError,
    handleChange,
    handleBlur,
    handleSelect,
    clearForm,
  } = useForm({
    defaultFormData: {
      name: '',
      location: [],
      email: '',
      species: '',
      gender: '',
      breed: '',
      color: '',
      size: '',
      picture: null,
      status: 'lost',
    },
    defaultFormError: { email: '', species: '', location: '' },
  });

  const { user } = useUser();

  if (!auth.currentUser) {
    return <Navigate to="/lost-found" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasError = Object.values(formError).some((e) => e);

    if (hasError) {
      return message.error('This form has errors');
    }

    const {
      name,
      location,
      email,
      species,
      gender,
      breed,
      color,
      size,
      picture,
      status,
    } = Object.keys(formData).reduce((acc, cur) => {
      return cur === 'picture' || cur === 'location'
        ? { ...acc, [cur]: formData[cur] }
        : { ...acc, [cur]: formData[cur] || 'Unknown' };
    }, {});

    const pureBase64 = picture && picture.split(',')[1];

    const imageUrl =
      pureBase64 && (await uploadImage(pureBase64, name || species));

    const lostLocation = status === 'lost' ? location.split(',') : [];
    const foundLocation = status === 'found' ? location.split(',') : [];

    const res = await createReport({
      name,
      species,
      color,
      size,
      gender,
      breed,
      picture: imageUrl,
      lostLocation,
      foundLocation,
      status,
      email,
      userUID: user.uid,
    });

    if (res) {
      clearForm();
      return message.success('Report created successfully');
    }

    return message.error('Error creating report');
  };

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <h1>Report a Pet</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          {NEW_REPORT.map(
            ({
              component,
              name,
              label,
              type,
              placeholder,
              options,
              required,
            }) => {
              switch (component) {
                case COMPONENTS.input:
                  return (
                    <CustomInput
                      key={name}
                      label={label}
                      type={type}
                      name={name}
                      id={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={formError[name]}
                      required={required}
                    />
                  );
                case COMPONENTS.select:
                  return (
                    <CustomSelect
                      key={name}
                      name={name}
                      label={label}
                      value={formData[name] || []}
                      handleChange={(val) => handleSelect(val, name)}
                      placeholder={placeholder}
                      options={options}
                      className={styles.select}
                      required={required}
                      onBlur={() =>
                        handleBlur({
                          target: { value: formData[name], name },
                        })
                      }
                      error={formError[name]}
                    />
                  );
                case COMPONENTS.locationSelect:
                  return (
                    <LocationSelect
                      key={name}
                      name={name}
                      label={label}
                      placeholder={placeholder}
                      value={formData[name]}
                      handleChange={(val) => handleSelect(val, name)}
                      required={required}
                      onBlur={() =>
                        handleBlur({
                          target: { value: formData[name], name },
                        })
                      }
                      error={formError[name]}
                    />
                  );
                case COMPONENTS.radioGroup:
                  return (
                    <Radio.Group
                      block
                      key={name}
                      name={name}
                      options={options}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  );
                case COMPONENTS.uploadImage:
                  return (
                    <UploadImage
                      key={name}
                      name={name}
                      label={label}
                      imageUrl={formData[name]}
                      onChange={(val) => handleSelect(val, name)}
                    />
                  );
                default:
                  return null;
              }
            },
          )}
          <Button className={styles.submit} type="submit">
            Create
          </Button>
        </form>
      </Container>
    </section>
  );
}
