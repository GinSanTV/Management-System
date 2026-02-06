
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { auth, signInUser, logoutUser, resetUserPassword } from '../lib/auth';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async (firebaseUser: FirebaseUser): Promise<UserProfile> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: data.displayName || 'Unnamed operative',
          role: data.role as UserRole || UserRole.GUEST,
          avatarUrl: data.avatarUrl,
          createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now()
        };
      }
      
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'New operative',
        role: UserRole.GUEST,
        createdAt: Date.now()
      };
    } catch (error) {
      console.error("Profile sync failure:", error);
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'Error Synced Operative',
        role: UserRole.GUEST,
        createdAt: Date.now()
      };
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  const login = useCallback(async (email: string, pass: string) => {
    await signInUser(email, pass);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await resetUserPassword(email);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
