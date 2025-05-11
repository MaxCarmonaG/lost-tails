import { Routes, Route } from 'react-router';
import Header from '@/Components/Header';
import './App.css';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Adoption from '@/pages/Adoption';
import LostFound from '@/pages/LostFound';
import Signup from '@/pages/Signup';
import SuccessfulCases from '@/pages/SuccessfulCases';
import Donation from '@/pages/Donation';
import Footer from '@/Components/Footer';
import PetDetailsSection from '@/Components/PetDetailsSection';
import PetList from '@/Components/PetsList';
import NewReport from '@/Components/NewReport';
import MyReports from './pages/MyReports';
import E404 from './pages/E404';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="adoption" element={<Adoption />} />
        <Route path="donation" element={<Donation />} />
        <Route path="login" element={<Login />} />
        <Route path="lost-found" element={<LostFound />}>
          <Route index element={<PetList />} />
          <Route path="new-report" element={<NewReport />} />
          <Route path=":id" element={<PetDetailsSection />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="successful-cases" element={<SuccessfulCases />} />
        <Route path="my-reports" element={<MyReports />} />
        <Route path="*" element={<E404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
