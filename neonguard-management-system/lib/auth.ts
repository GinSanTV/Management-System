
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  Auth
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import app, { db } from './firebase';
import { UserRole } from '../types';

// Initialize Auth
export const auth: Auth = getAuth(app);

/**
 * Maps Firebase error codes to Cyberpunk-themed error messages.
 */
const handleAuthError = (error: any): string => {
  console.error("AUTH_ERROR_LOG:", error.code, error.message);
  switch (error.code) {
    case 'auth/email-already-in-use':
      return "IDENTITY_EXISTS: This tag is already registered in the Nexus.";
    case 'auth/invalid-email':
      return "FORMAT_ERROR: Malformed identity tag detected.";
    case 'auth/weak-password':
      return "SECURITY_BREACH: Access phrase is too vulnerable.";
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return "CREDENTIAL_MISMATCH: Access denied by security protocols.";
    case 'auth/too-many-requests':
      return "FLOOD_PROTECTION: Too many attempts. Uplink throttled.";
    default:
      return `UPLINK_FAILURE: Error code ${error.code || 'UNKNOWN'}`;
  }
};

/**
 * Creates a new user in Firebase Auth and initializes their profile in Firestore.
 */
export const signUpUser = async (email: string, pass: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    // Update Auth Profile
    await updateProfile(user, { displayName });

    // Initialize Firestore Profile
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: UserRole.GUEST, // Default role for new operatives
      createdAt: serverTimestamp(),
      status: 'ACTIVE'
    });

    return user;
  } catch (error: any) {
    throw new Error(handleAuthError(error));
  }
};

/**
 * Authenticates a user with email and password.
 */
export const signInUser = async (email: string, pass: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(handleAuthError(error));
  }
};

/**
 * Terminates the current session.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error("TERMINATION_FAILURE: Could not close the secure link.");
  }
};

/**
 * Sends a password recovery transmission.
 */
export const resetUserPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(handleAuthError(error));
  }
};
