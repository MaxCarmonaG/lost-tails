// ========================== IMPORTS ========================== //

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  Timestamp,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';

// ========================== CONFIGURATION ========================== //

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// ========================== REFERENCES ========================== //

const usersRef = collection(db, 'users');
const reportsRef = collection(db, 'reports');
const donationsRef = collection(db, 'donations');

// ========================== LOGIN/LOGOUT ========================== //

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await setDoc(doc(usersRef, user.uid), {
      firstName,
      lastName,
      email,
      createdAt: new Date(),
    });

    console.log('Success', 'User registered successfully!');

    return {
      success: true,
      message: 'User registered successfully!',
    };
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      console.log(
        'Error',
        'This email is already in use. Please try logging in.',
      );
      return {
        success: false,
        message: 'This email is already in use. Please try logging in.',
      };
    }
    console.log('Error', 'Error registering user: ' + e);
    return {
      success: false,
      message: 'Error registering user. Please try again.',
    };
  }
};

export const login = async (email, password, remember, onError) => {
  try {
    const persistenceType = remember
      ? browserLocalPersistence
      : browserSessionPersistence;

    await setPersistence(auth, persistenceType);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log('Error', 'Invalid credentials: ' + e);
    onError();
  }
};

export const getUserInfo = async () => {
  try {
    const email = auth?.currentUser?.email;
    const docRef = doc(db, 'users', email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { firstName, lastName } = docSnap.data();
      return { firstName, lastName, email };
    } else {
      console.log('Error', 'No user found!');
      return {};
    }
  } catch (e) {
    console.log('Error', 'Error retrieving user: ' + e);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log('Success', 'User logged out!');
  } catch (e) {
    console.log('Error', 'Error login out: ' + e);
  }
};

export const authObserver = (callback) =>
  auth.onAuthStateChanged((user) => callback(user));

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (e) {
    console.error(e.message);
  }
};

export const resetPassword = async (email, success) => {
  try {
    await sendPasswordResetEmail(auth, email);
    success('Password reset email sent!');
  } catch (e) {
    console.error(e.message);
  }
};

// ========================== REPORT ========================== //

export const createReport = async ({
  name,
  species,
  color,
  size,
  gender,
  breed,
  picture,
  lostLocation,
  foundLocation,
  status,
  email,
  userUID,
}) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await addDoc(reportsRef, {
      name,
      species,
      color,
      size,
      gender,
      breed,
      picture,
      lostLocation,
      foundLocation,
      status,
      email,
      date: Timestamp.now().toMillis(),
      userUID,
    });

    return true;
  } catch (e) {
    console.error('Error', 'Error creating report: ' + e);
    return null;
  }
};

export const getReport = async (id) => {
  const docRef = doc(db, 'reports', id);

  try {
    const reportSnapshot = await getDoc(docRef);
    if (reportSnapshot.exists()) {
      const formatDate = (stamp) =>
        new Intl.DateTimeFormat('en-CA', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(stamp);

      const data = reportSnapshot.data();

      return { ...data, date: formatDate(data.date), id };
    }
    console.log('Error', 'No report found!');
    return null;
  } catch (e) {
    console.log('Error', 'Error retrieving report: ' + e);
  }
};

export const reportsObserver = (callback) => {
  const q = query(collection(db, 'reports'), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const reports = [];
    snapshot.forEach((doc) => {
      reports.push({ ...doc.data(), id: doc.id });
    });
    callback(reports);
  });
};

export const updateReport = async (id, updatedData) => {
  const docRef = doc(db, 'reports', id);
  try {
    await setDoc(docRef, updatedData, { merge: true });
    console.log('Success', 'Report updated successfully!');
    return true;
  } catch (e) {
    console.error('Error', 'Error updating report: ' + e);
    return null;
  }
};

// ========================== DONATIONS ========================== //

export const addDonation = async (newDonation) => {
  addDoc(donationsRef, newDonation);
  return true;
};

export const getAllDonations = async () => {
  const donationsSnapshot = await getDocs(donationsRef);
  return donationsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const listenToDonations = (callback) => {
  return onSnapshot(donationsRef, (snapshot) => {
    const donationsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(donationsList);
  });
};
