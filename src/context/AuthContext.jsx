import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc,setDoc} from "firebase/firestore";
import { auth, db } from "../firebase";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, rol) => {
    try {
        // Crear usuario en Auth
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        // Guardar el rol en la base de datos
        await setDoc(doc(db, "users", user.uid), { email, rol });
        
    } catch (error) {
        // Manejar errores de autenticación
        if (error.code === "auth/email-already-in-use") {
            console.error("El correo electrónico ya está en uso.");
            // Aquí podrías mostrar un mensaje al usuario indicando que el correo electrónico ya está en uso
        } else {
            console.error("Error al crear el usuario:", error);
        }
    }
};



  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}