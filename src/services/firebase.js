import { ref, push, update, remove, onValue, off } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { database, auth } from '../config/firebase';
import { PATIENT_STATUS } from '../constants';

// Authentication service
export const authService = {
  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign in error:', error);
      // Magyar hibaüzenetek
      let errorMessage = 'Sikertelen bejelentkezés';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Nem található ilyen felhasználó';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Hibás jelszó';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Érvénytelen email cím';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Túl sok sikertelen próbálkozás. Próbálja újra később!';
      }
      return { success: false, error: errorMessage };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Subscribe to auth state changes
  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};

// Original firebase service
export const firebaseService = {
  // Add a new patient to the queue
  addPatient: async (patientData) => {
    try {
      const patientsRef = ref(database, 'patients');
      await push(patientsRef, {
        ...patientData,
        timestamp: new Date().toISOString(),
        status: PATIENT_STATUS.WAITING
      });
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  },

  // Update patient status
  updatePatientStatus: async (patientId, status) => {
    try {
      const patientRef = ref(database, `patients/${patientId}`);
      await update(patientRef, { status });
    } catch (error) {
      console.error('Error updating patient status:', error);
      throw error;
    }
  },

  // Delete patient from queue
  deletePatient: async (patientId) => {
    try {
      const patientRef = ref(database, `patients/${patientId}`);
      await remove(patientRef);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  },

  // Add patient to called list
  addCalledPatient: async (patientData) => {
    try {
      const calledRef = ref(database, 'calledPatients');
      await push(calledRef, {
        ...patientData,
        calledAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding called patient:', error);
      throw error;
    }
  },

  // Remove patient from called list
  removeCalledPatient: async (calledId) => {
    try {
      const calledRef = ref(database, `calledPatients/${calledId}`);
      await remove(calledRef);
    } catch (error) {
      console.error('Error removing called patient:', error);
      throw error;
    }
  },

  // Subscribe to patients data
  subscribeToPatients: (callback) => {
    const patientsRef = ref(database, 'patients');
    onValue(patientsRef, (snapshot) => {
      const data = snapshot.val();
      callback(data || {});
    });
    
    return () => off(patientsRef);
  },

  // Subscribe to called patients data
  subscribeToCalledPatients: (callback) => {
    const calledRef = ref(database, 'calledPatients');
    onValue(calledRef, (snapshot) => {
      const data = snapshot.val();
      callback(data || {});
    });
    
    return () => off(calledRef);
  }
};