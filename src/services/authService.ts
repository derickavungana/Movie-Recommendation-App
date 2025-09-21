// src/services/authService.ts

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, Auth, User } from 'firebase/auth';

let auth: Auth | undefined; // Correctly type the variable

if (typeof window !== 'undefined') {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
}

export const login = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase Auth not initialized.'); // Add a check
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export const signup = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase Auth not initialized.'); // Add a check
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export const logout = async () => {
    if (auth) { // A simpler check here
        await signOut(auth);
    }
};

export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
    if (auth) {
        return onAuthStateChanged(auth, callback);
    }
    return () => {};
};