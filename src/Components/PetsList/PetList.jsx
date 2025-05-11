import Pet from '@/Components/Pet';
import PetsFilter from '@/Components/PetsFilter';
import styles from './PetList.module.css';
import Container from '@/UI/Container';
import { Link, useNavigate } from 'react-router';
import useReports from '@/hooks/useReports';
import useUser from '@/hooks/useUser';
import Button from '@/UI/Button';
import PetLoading from '../PetLoading';

import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function PetList() {
  const { reports, list, setList, loading } = useReports();

  const { user } = useUser();

  const navigate = useNavigate();

  const routeLocation = useLocation();
  const queryParams = new URLSearchParams(routeLocation.search);
  const statusFilter = queryParams.get('status');

  useEffect(() => {
    if (statusFilter) {
      setList(reports.filter((r) => r.status === statusFilter));
    } else {
      setList(reports);
    }
  }, [statusFilter, reports, setList]);

  return (
    <section className={styles.list}>
      <Container className={styles.container}>
        <div className={styles.header}>
          <h1>Lost & Found</h1>
          <Button
            disabled={!user}
            onClick={() => navigate('new-report')}
            tooltip="Please Login"
          >
            + Report a new pet
          </Button>
        </div>
        <div className={styles.content}>
          <PetsFilter data={reports} setter={setList} />
          <div className={styles.grid}>
            {loading ? (
              <PetLoading length={6} />
            ) : (
              !!list.length &&
              list.map(({ id, picture, name, breed, gender, status }) => (
                <Link
                  key={id}
                  to={`/lost-found/${id}`}
                  className={styles.cardLink}
                >
                  <Pet
                    key={id}
                    picture={picture}
                    name={name}
                    breed={breed}
                    gender={gender}
                    status={status}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
