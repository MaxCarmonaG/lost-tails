import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import useReports from '@/hooks/useReports';
import Pet from '@/Components/Pet';
import styles from './MyReports.module.css';
import Container from '@/UI/Container';
import EditReport from '@/Components/EditReport';
import { Modal } from 'antd';
import { useNavigate } from 'react-router';
import { auth } from '@/lib/firebase';

export default function MyReports() {
  const { user } = useUser();
  const { reports } = useReports();
  const [userReports, setUserReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user && reports) {
      setUserReports(reports.filter((report) => report.userUID === user.uid));
    }
  }, [user, reports]);

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <section className={styles.reportList}>
      <Container className={styles.reportContainer}>
        <div className={styles.reportHeader}>
          <h1>My Reports</h1>
          <p className={styles.reportIntro}>
            This page displays all the reports you&apos;ve submitted about lost
            or found pets. Click on a report to edit the details or update its
            status.
          </p>
        </div>

        {userReports.length > 0 ? (
          <div className={styles.grid}>
            {userReports.map((report) => (
              <div
                key={report.id}
                className={styles.card}
                onClick={() => openModal(report)}
              >
                <Pet {...report} />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noReports}>No reports found.</p>
        )}
      </Container>

      {/* Ant Design Modal */}
      <Modal
        title="Edit Report"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
      >
        {selectedReport && (
          <EditReport reportId={selectedReport.id} onClose={closeModal} />
        )}
      </Modal>
    </section>
  );
}
