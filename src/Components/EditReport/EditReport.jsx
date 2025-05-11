import { useState, useEffect } from 'react';
import Button from '@/UI/Button';
import { getReport, updateReport } from '@/lib/firebase';
import UploadImage from '@/UI/UploadImage';
import styles from './EditReport.module.css';

const EditReport = ({ reportId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    color: '',
    gender: '',
    size: '',
    species: '',
    status: '',
    date: '',
    email: '',
    picture: '',
    location: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) return;
      setLoading(true);
      const reportData = await getReport(reportId);

      if (reportData) {
        if (!reportData.date || isNaN(new Date(reportData.date))) {
          reportData.date = new Date().toISOString().split('T')[0];
        } else if (typeof reportData.date === 'number') {
          reportData.date = new Date(reportData.date)
            .toISOString()
            .split('T')[0];
        }

        const updatedFormData = Object.keys(reportData).reduce((acc, cur) => {
          if (
            cur === 'species' ||
            cur === 'status' ||
            cur === 'size' ||
            cur === 'gender'
          ) {
            return {
              ...acc,
              [cur]:
                reportData[cur].charAt(0).toUpperCase() +
                reportData[cur].slice(1),
            };
          }
          return {
            ...acc,
            [cur]: Array.isArray(reportData[cur])
              ? reportData[cur].join(', ')
              : reportData[cur] || '',
          };
        }, {});

        setFormData(updatedFormData);
      }

      setLoading(false);
    };

    fetchReport();
  }, [reportId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let lostLocation = [];
    let foundLocation = [];

    if (formData.status.toLowerCase() === 'lost') {
      lostLocation = formData.foundLocation
        .split(',')
        .map((item) => item.trim());
      foundLocation = ['Unknown'];
    } else if (formData.status.toLowerCase() === 'found') {
      foundLocation = formData.lostLocation
        .split(',')
        .map((item) => item.trim());
      lostLocation = ['Unknown'];
    }

    const cleanedData = Object.keys(formData).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]:
          cur === 'date'
            ? new Date(formData[cur]).getTime()
            : cur === 'species' ||
                cur === 'status' ||
                cur === 'size' ||
                cur === 'gender'
              ? formData[cur].toLowerCase()
              : formData[cur] || 'Unknown',
      }),
      {},
    );

    cleanedData.lostLocation = lostLocation;
    cleanedData.foundLocation = foundLocation;

    const success = await updateReport(reportId, cleanedData);

    if (success) {
      alert('Report updated successfully!');
      if (onClose) onClose();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGrid}>
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Breed', name: 'breed', type: 'text' },
          { label: 'Color', name: 'color', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
        ].map(({ label, name, type }) => (
          <div key={name} className={styles.formField}>
            <label className={styles.label}>{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        ))}

        {[
          {
            label: 'Species',
            name: 'species',
            options: ['Cat', 'Dog', 'Other'],
          },
          { label: 'Gender', name: 'gender', options: ['Male', 'Female'] },
          {
            label: 'Size',
            name: 'size',
            options: ['Small', 'Medium', 'Large', 'Extra Large'],
          },
          {
            label: 'Status',
            name: 'status',
            options: ['Lost', 'Found', 'Complete'],
          },
        ].map(({ label, name, options }) => (
          <div key={name} className={styles.formField}>
            <label className={styles.label}>{label}:</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={styles.select}
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className={styles.footerRow}>
        <div className={styles.imageButtonContainer}>
          <div className={styles.uploadImageContainer}>
            <UploadImage
              name="picture"
              imageUrl={formData.picture}
              className={styles.uploadImage}
              onChange={(newImage) =>
                setFormData((prevData) => ({ ...prevData, picture: newImage }))
              }
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className={styles.button}
            tooltip="Update report"
          >
            Update Report
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditReport;
