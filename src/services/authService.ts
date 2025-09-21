import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

let auth: any;

// Only initialize Firebase on the client side (in the browser)
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

// Explicitly define the types for email and password as strings
export const login = async (email: string, password: string) => {
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

// Explicitly define the types for email and password as strings
export const signup = async (email: string, password: string) => {
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
    if (auth) {
        await signOut(auth);
    }
};

// Use the specific User type from Firebase Auth
export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
    if (auth) {
        return onAuthStateChanged(auth, callback);
    }
    // Return an empty function for server-side to prevent errors
    return () => {};
};